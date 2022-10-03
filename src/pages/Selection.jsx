import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SelectionCard from '../components/SelectionCard';
import doctor_image from '../assets/doctor_image.jpg';
import symptom_declaration_image from '../assets/symptom_declaration_image.jpg';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Fade, Zoom } from '@mui/material';

export default function Selection(props) {
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

    const onClickHandler = (event) => {
        console.log('Clicked!');
        if (event === 0) {
            // Doctor Chat chosen
            navigate('/doctorchat');
        }
        if (event === 1) {
            // Symptom Declaration chosen
            navigate('/symptomdeclaration');
        }
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
            <Grid container alignItems='center' justifyContent='center'>
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
                                Welcome! What would you like to do today?
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
                        <Grid item mr={5}>
                            <SelectionCard
                                image={doctor_image}
                                title='Chat with a doctor'
                                subtitle='Consult a doctor using live chat.'
                                onClick={() => {
                                    onClickHandler(0);
                                }}
                            />
                        </Grid>
                        <Grid item ml={5}>
                            <SelectionCard
                                image={symptom_declaration_image}
                                title='Declare symptoms'
                                subtitle='Indicate your symptoms using a visual diagram.'
                                onClick={() => {
                                    onClickHandler(1);
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
