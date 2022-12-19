import React, { useState } from 'react'
import './Signup.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../network/client';

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
            const data =  await axiosClient.post('/register', JSON.stringify({ first_name, last_name, email, password }));
            console.log(data.data);
            alert('Data successfully submitted');
            navigate('/login');

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
        else {
            return false;
        }
    }

    return (
        <div className="signup-main">

            <div className='signup'>
                <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined"
                        className='signup-card'
                        sx={{ height: 550, width: 400, borderRadius: 10 }}>
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
                            disabled = {loading}
                            value={userData.first_name}
                            name="first_name"
                            onChange={(e) => handleInputs(e)}
                            error={error.first_name}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            value={userData.last_name}
                            disabled = {loading}
                            onChange={(e) => handleInputs(e)}
                            name="last_name"
                            label="Last name"
                            error={error.last_name}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            value={userData.email}
                            disabled = {loading}
                            name="email"
                            onChange={(e) => handleInputs(e)}
                            label="Email address"
                            error={error.email}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            sx={{ width: '90%', marginTop: 3 }}
                            label="Password"
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
                            onClick={createUser}
                            variant="contained">
                            Sign Up
                        </Button>

                        <Typography
                            component='span'
                            variant='body2'
                            sx={{ color: 'gray', marginTop: 1, marginLeft: 23 }}>
                            Already registered&nbsp;
                            <Link to='/login'
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