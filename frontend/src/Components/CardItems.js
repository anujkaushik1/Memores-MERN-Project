import React, { useEffect, useState } from 'react'
import './CardItems.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinearProgress, Grid, Paper, imageListClasses } from '@mui/material';
import Box from '@mui/material/Box';
import testingimage from '../static/testingflask.jpg';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import axiosClient from '../network/client';



function CardItems() {

  const [memoryItemData, setMemoryItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_URL = 'http://localhost:5000/uploads/'

  useEffect(() => {

    (async () => {

      try {

        const data = await axiosClient.get('/');

        const memoryData = data.data.data.map((item) => {
          const image = IMAGE_URL + item.file;
          item.file = image;
          return item;
        });  
        

        setMemoryItemData(memoryData);
        setLoading(false);

      } catch (error) {
          console.log(error.response);
          setLoading(true);
      }

    })();

  }, []);


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
              sm={12} lg={10} xs={12} md={10}
              container
              position={'relative'}
              left={'15.5rem'}
              top={'10px'} >

              {
                memoryItemData.map((item, idx) => (
                  <Grid
                    item
                    bottom={8} marginTop={2} paddingLeft={2} paddingRight={2}
                    position={'relative'}>
                    <Box>
                      <Card
                        variant='elevation'
                        sx={{ width: 270, borderRadius: 3 }}>
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
                            sx={{ fontWeight: 'bold' }}>
                            <ThumbUpIcon
                              fontSize='small'
                              sx={{ paddingRight: 0.5 }} />
                            Like
                          </Button>

                          <Typography
                            variant="body2"
                            color='#1976d2'
                            sx={{ paddingTop: 0.22, fontWeight: 'bold' }}>
                            0
                          </Typography>
                          <Button
                            size="small"
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