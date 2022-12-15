import React from 'react'
import './CardItems.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import testingimage from '../static/testingflask.jpg';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';

function CardItems() {
  return (
    <div className='carditems-main'>

      <div className='cards'>

        <Grid sm={12} lg={10} xs={12} md={10} container position={'relative'} left={'15.5rem'} top={'10px'}>
          <Grid item paddingLeft={2} paddingRight={2} paddingTop={2}>
            <Box>
              <Card variant='elevation' sx={{ width: 270, borderRadius: 3 }}>
                <Typography component='span' variant='body2' sx={{margin : 0, padding : 0, position : 'absolute', top : '2rem', left : '1.5rem', fontSize : '18px' ,fontWeight : '540', color : 'white'}}>
                    Hello worldddd
                </Typography>

                <Typography component='span' variant='body2' sx={{margin : 0, padding : 0, position : 'absolute', top : '3.6rem', left : '1.5rem', fontSize : '12px', fontWeight : '540', color : 'white'}}>
                   2 months ago
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image = {testingimage}
                  alt="green iguana"
                />

                 <Typography component='span' variant='body2' sx={{padding : 0, position : 'relative', top : '4px', left : '15px' ,fontSize : '10px', fontWeight : '540', color : 'grey'}}>
                    #everything
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions >
                  <Button size="small" sx = {{fontWeight : 'bold'}}><ThumbUpIcon fontSize='small' sx={{paddingRight : 0.5}}/>Like</Button>
                  <Typography variant="body2" color = '#1976d2' sx={{paddingTop : 0.22, fontWeight : 'bold'}}>
                    0
                  </Typography>
                  <Button size="small" sx = {{fontWeight : 'bold', paddingLeft : 11}}><DeleteIcon fontSize='small'/>Delete</Button>
                </CardActions>
              </Card>
            </Box>

          </Grid>

          <Grid item paddingLeft={2} paddingRight={2} paddingTop={2}>
            <Box>
              <Card variant='elevation' sx={{ width: 270, borderRadius: 3 }}>
                <Typography component='span' variant='body2' sx={{margin : 0, padding : 0, position : 'absolute', top : '2rem', left : '1.5rem', fontSize : '18px' ,fontWeight : '540', color : 'white'}}>
                    Hello worldddd
                </Typography>

                <Typography component='span' variant='body2' sx={{margin : 0, padding : 0, position : 'absolute', top : '3.6rem', left : '1.5rem', fontSize : '12px', fontWeight : '540', color : 'white'}}>
                   2 months ago
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image = {testingimage}
                  alt="green iguana"
                />

                 <Typography component='span' variant='body2' sx={{padding : 0, position : 'relative', top : '4px', left : '15px' ,fontSize : '10px', fontWeight : '540', color : 'grey'}}>
                    #everything
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions >
                  <Button size="small" sx = {{fontWeight : 'bold'}}><ThumbUpIcon fontSize='small' sx={{paddingRight : 0.5}}/>Like</Button>
                  <Typography variant="body2" color = '#1976d2' sx={{paddingTop : 0.22, fontWeight : 'bold'}}>
                    0
                  </Typography>
                  <Button size="small" sx = {{fontWeight : 'bold', paddingLeft : 11}}><DeleteIcon fontSize='small'/>Delete</Button>
                </CardActions>
              </Card>
            </Box>

          </Grid>

        </Grid>


      </div>

    </div>
  )
}

export default CardItems