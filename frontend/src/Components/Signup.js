import React from 'react'
import './Signup.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="signup-main">

            <div className='signup'>
                <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined" 
                        className='signup-card' 
                        sx={{ height: 550, width: 400 }}>
                        <Typography 
                            component='span' 
                            variant='body2' 
                            sx={{ marginTop: '1rem', color: 'black', fontSize: '25px', fontWeight: '600' }}>
                            Sign Up
                        </Typography>

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="First name"
                            error={false}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="Last name"
                            error={false}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="Email address"
                            error={false}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="Password"
                            error={false}
                            variant="outlined" />

                        <Button
                            sx={{ width: '90%', backgroundColor: '#4169E1', marginTop: 3 }}
                            size='medium'
                            variant="contained">
                            Sign Up
                        </Button>

                        <Typography
                            component='span'
                            variant='body2'
                            sx={{ color: 'gray', marginTop : 1, marginLeft : 23 }}>
                            Already registered&nbsp; 
                            <Link to='/login' 
                                style={{textDecoration : 'none', color : '#0096FF'}}>
                                sign in?
                            </Link>
                        </Typography>

                    </Card>
                </Box>
            </div>

        </div>
    )
}

export default Signup