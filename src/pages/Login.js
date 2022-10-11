import React from 'react';
import {Typography, Button , Box, ButtonGroup , Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
  

export default function Login() {
    const navigate = useNavigate();

    const handleUser = () => {
        navigate('/LoginUser');
    }

    const handleDoctor = () => {
        navigate('/LoginDoctor');
    }

    return(
        <Box
        sx={{
          display: 'flex',
          alignItems: 'centre',
          flexDirection: 'column',
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
        <div>
        <Typography variant='h4'
            component='h1'
            align='center'>
            <b>Login Here</b>
        </Typography>
        </div>
        <Box
        sx={{
          display: 'flex',
          alignItems: 'centre',
          flexDirection: 'column',
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          width: 400 , 
          height: 213
        }}
        border={1}
        borderColor='#D4D4D4'
        borderRadius={10}>
            <ButtonGroup 
            orientation="vertical" 
            aria-label="vertical outlined button group" 
            sx={{gap:2}}>

            <Button variant='contained'
                onClick={handleUser}>
            User Login
            </Button><br/>

            <div>
            <Divider textAlign="center">
            <Typography>
            Or
            </Typography>
            </Divider>
            </div>
            <br/>

            <Button variant='contained'
                    onClick={handleDoctor}>
            Doctor Login
            </Button>
            </ButtonGroup>   
        </Box>
        </Box>
    );
}