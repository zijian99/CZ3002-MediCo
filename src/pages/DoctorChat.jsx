import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Grid, CircularProgress, Button, IconButton } from '@mui/material';
import ChatBar from '../components/ChatBar';
import ChatWindow from '../components/ChatWindow';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ExitDialog from '../components/ExitDialog.jsx';

export default function DoctorChat(props) {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOption, setDialogOption] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Exit selected in dialog:
        if (dialogOption) {
            navigate('/payment');
        }

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

    const xButtonHandler = () => {
        // Open dialog to end chat:
        setDialogOpen((prev) => true);
    };

    const dialogCloseHandler = (value) => {
        setDialogOpen((prev) => false);
        setDialogOption((prev) => value);
    };

    return loading ? (
        <Grid
            container
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
            sx={{ minHeight: '100vh', bgcolor: 'background.default' }}
            direction='column'
        >
            <Grid container item justifyContent='flex-end'>
                <IconButton onClick={xButtonHandler}>
                    <CloseIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid item alignItems='center' xs={12} sx={{ minHeight: '72vh' }}>
                <ChatWindow userName={'Kate'} />
            </Grid>
            <Grid item>
                <ChatBar />
            </Grid>
            <ExitDialog open={dialogOpen} onClose={dialogCloseHandler} />
        </Grid>
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
}
