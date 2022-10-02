import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Grid, CircularProgress, Button, IconButton } from '@mui/material';
import ChatBar from '../components/ChatBar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ExitDialog from '../components/ExitDialog.jsx';

import {createConsultHistory1, createChatHistory} from '../firestore functions.js';
import {serverTimestamp} from "firebase/firestore";

export default function DoctorChat(props) {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOption, setDialogOption] = useState(false);
    const navigate = useNavigate();
    
    const {uDocRef, dDocRef} = null;

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
        
        /*----------------------Create new consult history document-----------------------*/
        /*-----------------------------Where to find doctor ID?---------------------------*/
        const timestamp = serverTimestamp();
        const docName = "Q4YOpBF1nrh47yGuh0UQ";
        const {uDocRef, dDocRef} = createConsultHistory1(userName, docName, timestamp);

        /*---------------store msg into firestore when doc/patient hits enter---------*/
        // if (uDocRef != null && dDocRef != null){
        //     if (sent msg){
        //         createChatHistory(uDocRef, dDocRef, timestamp, sender, msg);
        //     }
        // }
    };

    const dialogCloseHandler = (value) => {
        setDialogOpen((prev) => false);
        setDialogOption((prev) => value);
        const {uDocRef, dDocRef} = null;
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
