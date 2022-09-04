import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Grid, CircularProgress, Button } from '@mui/material';
import ChatBar from '../components/ChatBar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
export default function DoctorChat(props) {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        //Set up observer on user authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log('Authorization granted.');
                props.setLoggedIn(true);
                setUserName((prev) => user.uid);
                setLoading(false);
            } else {
                // User is signed out
                console.log('Not authorized.');
                props.setLoggedIn(false);
                setLoading(false);
            }
        });
    });
    return loading ? (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '90vh' }}
        >
            <CircularProgress size={60} />
        </Grid>
    ) : props.loggedIn ? (
        <Grid
            container
            justifyContent='flex-end'
            p={2}
            sx={{ minHeight: '100vh', bgcolor: 'background.default' }}
        >
            <Grid
                container
                sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                xs={12}
            >
                <ChatWindow userName={'Kate'} />
            </Grid>
            <Grid container xs={12} sx={{ justifyContent: 'flex-start' }}>
                <ChatBar />
            </Grid>
        </Grid>
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
}
