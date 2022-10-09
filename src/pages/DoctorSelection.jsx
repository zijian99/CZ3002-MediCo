import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SelectionCard from '../components/SelectionCard';
import doctor_side_chat from '../assets/doctor_side_chat.jpg';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Fade, Zoom } from '@mui/material';

export default function DoctorSelection(props) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        //Set up observer on user authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log('Authorization granted.');
                props.setLoggedIn(true);
                setLoading(false);
            } else {
                // User is signed out
                console.log('Not authorized.');
                props.setLoggedIn(false);
                setLoading(false);
            }
        });
    });

    const onClickHandler = () => {
        navigate('/doctorsidechat');
    };

    return loading ? (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '90vh' }}
        >
            <CircularProgress size={100} />
        </Grid>
    ) : props.loggedIn ? (
        <div>
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                marginTop='10vh'
            >
                <Fade in={true} timeout={2000}>
                    <Grid container alignItems='center' justifyContent='center'>
                        <Grid
                            item
                            alignItems='center'
                            justifyContent='center'
                            mb={3}
                        >
                            <Typography
                                sx={{ fontWeight: 'bold' }}
                                variant='h3'
                            >
                                Welcome Doctor!
                            </Typography>
                        </Grid>
                    </Grid>
                </Fade>
                <Zoom in={true} timeout={1000}>
                    <Grid
                        container
                        xs={12}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Grid item ml={5}>
                            <SelectionCard
                                image={doctor_side_chat}
                                title='Chat with Patient'
                                subtitle='Consult patients via live chat'
                                onClick={() => {
                                    onClickHandler();
                                }}
                            />
                        </Grid>
                    </Grid>
                </Zoom>
            </Grid>
        </div>
    ) : (
        <div>
            <Typography>Not logged in</Typography>
        </div>
    );
}
