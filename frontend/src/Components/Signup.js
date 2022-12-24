import React, { useState } from 'react'
import './Signup.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material/';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../network/client';
import useMediaQuery from '@mui/material/useMediaQuery';

function Signup() {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        first_name: false,
        last_name: false,
        email: false,
        password: false
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isMediumScreen = useMediaQuery('(min-width: 601px) and (max-width: 960px)');

    const handleInputs = (e) => {

        let name = e.target.name;
        let value = e.target.value
        setUserData({ ...userData, [name]: value });
    }

    const createUser = async () => {
        let { first_name, last_name, email, password } = userData;

        const isValidate = validation(first_name, last_name, email, password);

        if (!isValidate) {
            return;
        }
        try {
            const data = await axiosClient.post('/register', JSON.stringify({ first_name, last_name, email, password }));
            console.log(data.data);
            alert('Data successfully submitted');
            navigate('/');

        } catch (error) {
            console.log(error);
        }

    }

    const validation = (first_name, last_name, email, password) => {

        first_name = first_name === '' ? true : false;
        last_name = last_name === '' ? true : false;
        email = email === '' ? true : false;
        password = password === '' ? true : false;

        setError({ first_name, last_name, email, password });

        if (!first_name && !last_name && !email && !password) {
            return true;
        }

        return false;

    }

    return (
        <div className="signup-main">

            <div className='signup'>
                <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined"
                        className='signup-card'
                        sx={{ 
                            height: {
                                xs : 400,
                                sm : 500,
                                md : 500,
                                lg : 500,
                                xl : 500
                            }, 
                            width: {
                                xs : 270,
                                sm : 350,
                                md : 400,
                                lg : 400,
                                xl : 400
                            }, 
                            
                            borderRadius: {
                                xs : 4  ,
                                sm : 4,
                                md : 10,
                                lg : 10,
                                xl : 10
                            } 
                            
                        }}>,
                        
                        <Typography
                            component='span'
                            variant='body2'
                            sx={{
                                color: 'black', 
                                fontSize: {
                                    xs : '18px',     
                                    sm : '20px',
                                    md : '22px'
                                },
                                marginTop : {
                                    xl : 2
                                },

                                fontWeight: '600' 
                                }}>
                            Sign up
                        </Typography>

                        <TextField
                            id="outlined-basic"
                            sx={{ 
                                width: '90%', 
                                marginTop: 3,
                            }}
                            label="First name"
                            disabled={loading}
                            size = {isSmallScreen ? 'small' : 'medium'}
                            value={userData.first_name}
                            name="first_name"
                            onChange={(e) => handleInputs(e)}
                            error={error.first_name}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            value={userData.last_name}
                            disabled={loading}
                            size = {isSmallScreen ? 'small' : 'medium'}
                            onChange={(e) => handleInputs(e)}
                            name="last_name"
                            label="Last name"
                            error={error.last_name}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            value={userData.email}
                            disabled={loading}
                            name="email"
                            size = {isSmallScreen ? 'small' : 'medium'}
                            type='email'
                            onChange={(e) => handleInputs(e)}
                            label="Email address"
                            error={error.email}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="Password"
                            size = {isSmallScreen ? 'small' : 'medium'}
                            type='password'
                            disabled={loading}
                            onChange={(e) => handleInputs(e)}
                            value={userData.password}
                            name="password"
                            error={error.password}
                            variant="outlined" />

                        <Button
                            sx={{ width: '90%', backgroundColor: '#4169E1', marginTop: 3 }}
                            size = {isSmallScreen ? 'small' : 'medium'}
                            disabled={loading}
                            onClick={createUser}
                            variant="contained">
                            Sign Up
                        </Button>

                        <Typography
                            component='span'
                            variant='body2'
                            sx={{ 
                                color: 'gray', 
                                marginTop: 1, 
                                marginLeft: {
                                    md : 20,
                                    lg : 20,
                                    xl : 20
                                } 
                                }}>
                            Already registered&nbsp;
                            <Link to='/'
                                style={{ textDecoration: 'none', color: '#0096FF' }}>
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