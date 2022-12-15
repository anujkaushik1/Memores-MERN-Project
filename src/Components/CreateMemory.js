import { Typography } from '@mui/material'
import React from 'react'
import './CreateMemory.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CreateMemory() {


  return (
    <div className='creatememory-main'>
      <Typography component='span' variant='body2' sx={{ marginTop: '1rem', color: 'black', fontSize: '20px', fontWeight: '600' }}>
        Creating a Memory
      </Typography>

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Creator"
        error={false}
        variant="outlined" />

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Title"
        error={false}
        variant="outlined" />

      <TextField
        id="outlined-basic"
        label="Message"
        sx={{ width: '90%', marginTop: 1.2 }}
        multiline
        error={false}
        rows={4}
      />

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Tags (comma seperated)"
        error={false}
        variant="outlined" />

      <input style={{ marginTop: '1rem' }} type="file" id="myfile" />

      <Button sx={{width : '90%', backgroundColor : '	#0047AB', marginTop : 1.2}}  size = 'medium' variant="contained">Submit</Button>
      <Button disableFocusRipple style={{width : '90%', backgroundColor : 'red', position : 'relative', top : '0.5rem'}}  size = 'small' variant="contained">Clear</Button>

    </div>
  )
}

export default CreateMemory