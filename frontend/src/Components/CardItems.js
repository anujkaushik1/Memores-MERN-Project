import React, { useEffect, useRef, useState } from 'react'
import './CardItems.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinearProgress, Grid, Paper, imageListClasses, ListItemSecondaryAction } from '@mui/material';
import Box from '@mui/material/Box';
import testingimage from '../static/testingflask.jpg';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from '../network/client';
import moment from 'moment/moment';

function CardItems(props) {

  const [memoryItemData, setMemoryItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const IMAGE_URL = 'http://localhost:5000/uploads/';
  const like = useRef(null);

  useEffect(() => {

    (async () => {

      getAllMemoryItems();
      setUser(await currentUser());
      setLoading(false);
      

    })();

  }, [props.parentBool]);




  const getAllMemoryItems = async () => {

    try {

      const data = await axiosClient.get('/');

      const memoryData = data.data.data.map((item) => {
        const image = IMAGE_URL + item.file;
        const dateTimeAgo = moment(new Date(item.createdAt)).fromNow();
        item.file = image;
        item.createdAt = dateTimeAgo;
        return item;
      });

      setMemoryItemData(memoryData);

    } catch (error) {
      console.log(error.response);
      setLoading(true);
    }

  }


  const likeMemory = async (item) => {

    try {

      const memoryId = item._id;

      await axiosClient.post(`/like/${memoryId}`);

      getAllMemoryItems();

    } catch (error) {
      console.log(error.response);
    }

  }

  const currentUser = async () => {

    try {

      const user = await axiosClient.get('/current');
      return user.data.user._id;

    } catch (error) {
      console.log(error.response);
    }

  }

  const isDeleteDisabled = (item) => {

    if (user === null)
      return;

    if (item.user === user)
       return false;
    

    return true

  }

  const deleteMemory = async (item) => {

    try {
      const memoryId = item._id;
      await axiosClient.delete(`/${memoryId}`);
      getAllMemoryItems();
      alert('Memory has been deleted');

    } catch (error) {
      console.log(error.response);
    }


  }

  const sendDataToCreateMemory = (item, e) => {

    if(e.target.id === 'delete' || e.target.id === 'like' || like.current.id === 'like_svg')
        return ;
    
    if(item.user === user){

      let data = {...item};

      let tags = data.tags;
      tags = tags.slice(1);
      
      data.tags = tags;

      props.setDataFromCard(data);
 
    }

  }

  return (
    <div className='carditems-main'>

      <div className='cards'>


        {

          loading ?
            <div
              style={{ position: 'relative', top: '17rem', left: '2rem' }}>
              <LinearProgress color='secondary' />

            </div>
            :
            <Grid
              container
              position={'relative'}
              left={'15.5rem'}
              top={'10px'} >

              {
                memoryItemData.map((item) => (
                  <Grid
                    key={item._id}
                    item
                    bolikeom={8} marginTop={2} paddingLeft={2} paddingRight={2}
                    position={'relative'}>
                    <Box>
                      <Card
                        variant='elevation'
                        id='sendDataCard'
                        onClick={(e) => sendDataToCreateMemory(item, e)}

                        sx={{ 
                          width: {
                            xs : 270,
                            sm : 235,

                          }, 
                          borderRadius: 3,
                          cursor : item.user === user && 'pointer'
                          }}>
                        <Typography
                          component='span'
                          variant='body2'
                          sx={{ margin: 0, padding: 0, position: 'absolute', top: '1rem', left: '1.5rem', fontSize: '18px', fontWeight: '540', color: 'white' }}>
                          {item.creator}
                        </Typography>

                        <Typography
                          component='span'
                          variant='body2'
                          sx={{ margin: 0, padding: 0, position: 'absolute', top: '2.6rem', left: '1.5rem', fontSize: '12px', fontWeight: '540', color: 'white' }}>
                          {item.createdAt}
                        </Typography>

                        <CardMedia
                          component="img"
                          height="140"
                          image={item.file}
                          alt="green iguana"
                        />

                        <Typography
                          component='span'
                          variant='body2'
                          sx={{ padding: 0, position: 'relative', top: '4px', left: '15px', fontSize: '10px', fontWeight: '540', color: 'grey' }}>
                          {item.tags}
                        </Typography>

                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div">
                            {item.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary">
                            {item.message}
                          </Typography>
                        </CardContent>

                        <CardActions >
                          <Button
                            size="small"
                            id='like'
                            onClick={() => likeMemory(item)}
                            sx={{ fontWeight: 'bold', color : !item.isLike && 'gray' }}>
                            <ThumbUpIcon 
                              id = 'like_svg'
                              ref = {like}
                              fontSize='small'
                              sx={{ paddingRight: 0.5}} />
                              {item.isLike ? 'Dislike' : 'Like'}

                          </Button>

                          <Typography
                            variant="body2"
                            color='#1976d2'
                            sx={{ paddingTop: 0.22, fontWeight: 'bold' }}>
                            {item.likes.length}
                          </Typography>
                          <Button
                            size="small"
                            id='delete'
                            disabled={isDeleteDisabled(item)}
                            onClick={() => deleteMemory(item)}
                            sx={{ fontWeight: 'bold', position: 'absolute', right: '2rem' }}>
                            <DeleteIcon
                              fontSize='small' />
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                  </Grid>

                ))
              }

            </Grid>


        }


      </div>

    </div>
  )
}

export default CardItems