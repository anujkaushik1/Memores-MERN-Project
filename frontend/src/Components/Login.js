import React, { useState } from 'react'
import './Login.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../network/client';

function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        email: false,
        password: false
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputs = (e) => {

        let name = e.target.name;
        let value = e.target.value
        setUserData({ ...userData, [name]: value });
    }

    const loginUser = async () => {
        let { email, password } = userData;

        const isValidate = validation(email, password);

        if (!isValidate) {
            return;
        }
        try {
            const data =  await axiosClient.post('/login', JSON.stringify({ email, password }));
            console.log(data.data);
            navigate('/memory');

        } catch (error) {
            alert(error.response.data.msg);
        }

    }

    const validation = (email, password) => {

        email = email === '' ? true : false;
        password = password === '' ? true : false;

        setError({ email, password });

        if ( !email && !password) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className="login-main">

            <div className='login'>
                <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined"
                        className='login-card'
                        sx={{ height: 450, width: 400, borderRadius: 10 }}>
                        <Typography
                            component='span'
                            variant='body2'
                            sx={{color: 'black', fontSize: '25px', fontWeight: '600' }}>
                            Sign In
                        </Typography>


                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            value={userData.email}
                            disabled = {loading}
                            name="email"
                            type='email'
                            onChange={(e) => handleInputs(e)}
                            label="Email address"
                            error={error.email}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="Password"
                            type='password'
                            disabled = {loading}
                            onChange={(e) => handleInputs(e)}
                            value={userData.password}
                            name="password"
                            error={error.password}
                            variant="outlined" />

                        <Button
                            sx={{ width: '90%', backgroundColor: '#4169E1', marginTop: 3 }}
                            size='medium'
                            disabled = {loading}
                            onClick={loginUser}
                            variant="contained">
                            Log in
                        </Button>

                        <Typography
                            component='span'
                            variant='body2'
                            sx={{ color: 'gray', marginTop: 1, marginLeft: 30 }}>
                            New user&nbsp;
                            <Link to='/signup'
                                style={{ textDecoration: 'none', color: '#0096FF' }}>
                                sign up?
                            </Link>
                        </Typography>

                    </Card>
                </Box>
            </div>

        </div>
    )
}

export default Login