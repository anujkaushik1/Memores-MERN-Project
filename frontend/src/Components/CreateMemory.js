import { Typography } from '@mui/material'
import React, { useState, useRef } from 'react'
import './CreateMemory.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import axiosClient from '../network/client';

function CreateMemory(props) {

  const [memoryObj, setMemoryObj] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    file: ''
  });

  const [error, setError] = useState({
    creator: false,
    title: false,
    message: false,
    tags: false,
    file: false
  })

  const input = useRef();

  const handleInputs = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    setMemoryObj({ ...memoryObj, [name]: value })
  }

  const handleFileInput = (e) => {

    setMemoryObj({ ...memoryObj, file: '' });
    const file = e.target.files[0];

    console.log(input.current.value);

    if (file.size / (1024 * 1024) > 2) {   // file size greater than 2 mb
      alert('File size is too large !')
      input.current.value = '';
      return;
    }

    setMemoryObj({ ...memoryObj, file: file });

  }

  const clearMemoryInputs = () => {

    const clearObj = {
      creator: '',
      title: '',
      message: '',
      tags: '',
      file: ''
    };
    input.current.value = '';
    setMemoryObj({ ...clearObj });

  }

  const createMemory = async() => {

    let { creator, title, message, tags, file } = memoryObj;

    const isValidate = validation(creator, title, message, tags, file);

    if (!isValidate) {
      return;
    }

    try {
      
      const formData = new FormData();
      formData.append('creator', creator);
      formData.append('title', title);
      formData.append('message', message);
  
      tags = "#" + (tags.split(' ').join('_'));

      formData.append('tags', tags);
      formData.append('file', file);

      axiosClient.defaults.headers = 'multipart/form-data'; 

      await axiosClient.post('/', formData);

      props.changeState(!props.parentBool);

      alert('Data Submitted Successfully');
      clearMemoryInputs();

    } catch (error) {
      console.log(error);
    }


  }

  const validation = (creator, title, message, tags, file) => {

    creator = creator === '' ? true : false;
    title = title === '' ? true : false;
    message = message === '' ? true : false;
    tags = tags === '' ? true : false;
    file = file === '' ? true : false;

    setError({ creator, title, message, tags, file });

    if (file) {
      alert('Please add a file');
    }

    if (!creator && !title && !message && !tags && !file) {
      return true;
    }

    return false;

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
        onChange={(e) => handleInputs(e)}
        error={error.creator}
        variant="outlined" />

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Title"
        name='title'
        error={error.title}
        onChange={(e) => handleInputs(e)}
        value={memoryObj.title}
        variant="outlined" />

      <TextField
        id="outlined-basic"
        label="Message"
        name='message'
        onChange={(e) => handleInputs(e)}
        sx={{ width: '90%', marginTop: 1.2 }}
        multiline
        value={memoryObj.message}
        error={error.message}
        rows={4}
      />

      <TextField
        id="outlined-basic"
        sx={{ width: '90%', marginTop: 1.2 }}
        label="Tags (comma seperated)"
        name='tags'
        value={memoryObj.tags}
        onChange={(e) => handleInputs(e)}
        error={error.tags}
        variant="outlined" />

      <input
        style={{ marginTop: '1rem' }}
        type="file"
        ref={input}
        accept='image/png, image/jpg'
        onChange={(e) => handleFileInput(e)}
        id="myfile" />

      <Button
        sx={{ width: '90%', backgroundColor: '	#0047AB', marginTop: 1.2 }}
        size='medium'
        onClick={createMemory}
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