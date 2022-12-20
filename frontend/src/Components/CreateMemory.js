import { Typography } from '@mui/material'
import React, {useState, useRef} from 'react'
import './CreateMemory.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CreateMemory() {

  const [memoryObj, setMemoryObj] = useState({
    creator : '',
    title : '',
    message : '',
    tags : '',
    file : ''
  });

  const input = useRef();

  const handleInputs = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    setMemoryObj({...memoryObj, [name] : value})
  }

  const handleFileInput = (e) => {

    setMemoryObj({...memoryObj, file : ''});   
    const file = e.target.files[0];

    console.log(input.current.value);

    if(file.size / (1024 * 1024) > 2){   // file size greater than 2 mb
      alert('File size is too large !')
      input.current.value = '';
      return;
    }
    
    setMemoryObj({...memoryObj, file : file})

  }

  const clearMemoryInputs = () => {

    const clearObj = {
      creator : '',
      title : '',
      message : '',
      tags : '',
      file : ''
    };

    setMemoryObj({...clearObj});

  }


  return (
    <div className='creatememory-main'>
      <Typography
        component='span'
        variant='body2'
        sx={{ marginTop: '1rem', color: 'black', fontSize: '20px', fontWeight: '600' }}>
        Creating a Memory
      </Typography>

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Creator"
        name='creator'
        value={memoryObj.creator}
        onChange = {(e) => handleInputs(e)}
        error={false}
        variant="outlined" />

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Title"
        name='title'
        error={false}
        onChange = {(e) => handleInputs(e)}
        value={memoryObj.title}
        variant="outlined" />

      <TextField
        id="outlined-basic"
        label="Message"
        name='message'
        onChange = {(e) => handleInputs(e)}
        sx={{ width: '90%', marginTop: 1.2 }}
        multiline
        value={memoryObj.message}
        error={false}
        rows={4}
      />

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Tags (comma seperated)"
        name='tags'
        value={memoryObj.tags}
        onChange = {(e) => handleInputs(e)}
        error={false}
        variant="outlined" />

      <input
        style={{ marginTop: '1rem' }}
        type="file"
        ref={input} 
        // accept='image/png, image/jpg'
        onChange={(e) => handleFileInput(e)}
        id="myfile" />

      <Button
        sx={{ width: '90%', backgroundColor: '	#0047AB', marginTop: 1.2 }}
        size='medium'
        variant="contained">
        Submit
      </Button>
      <Button
        disableFocusRipple
        style={{ width: '90%', backgroundColor: 'red', position: 'relative', top: '0.5rem' }}
        size='small'
        onClick={clearMemoryInputs}
        variant="contained">
        Clear
      </Button>

    </div>
  )
}

export default CreateMemory