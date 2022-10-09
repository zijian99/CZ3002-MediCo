import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Grid, CircularProgress, IconButton } from '@mui/material';
import ChatBar from '../components/ChatBar';
import ChatWindow from '../components/ChatWindow';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ExitDialog from '../components/ExitDialog.jsx';

import {
    createConsultHistory1,
    getDisplayName,
} from '../firestore functions.js';
import { serverTimestamp } from 'firebase/firestore';

export default function DoctorChat(props) {
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState(null);
    const [userName, setUserName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOption, setDialogOption] = useState(false);
    const navigate = useNavigate();
    const [docRef, setDocRef] = useState(null);
    document.overflow = 'hidden';
    useEffect(() => {
        // Exit selected in dialog:
        if (dialogOption) {
            navigate('/payment');
        }

        //Set up observer on user authentication
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                console.log('Authorization granted.');
                props.setLoggedIn(true);
                setUserID((prev) => user.uid);

                /*----------------------Create new consult history document-----------------------*/
                /*-----------------------------Where to find doctor ID?---------------------------*/
                if (docRef === null) {
                    const timestamp = serverTimestamp();
                    const docName = 'Q4YOpBF1nrh47yGuh0UQ';
                    let { uDocRef, dDocRef } = await createConsultHistory1(
                        user.uid,
                        docName,
                        timestamp
                    );
                    console.log('uDocRef: ', uDocRef);
                    console.log('dDocRef: ', dDocRef);
                    setDocRef((prev) => ({
                        uDocRef,
                        dDocRef,
                    }));

                    const user_name = await getDisplayName(user.uid);
                    setUserName((prev) => user_name);
                }

                setLoading(false);
            } else {
                // User is signed out
                console.log('Not authorized.');
                props.setLoggedIn(false);
                setLoading(false);
            }
        });
    }, [dialogOption]);

    const xButtonHandler = () => {
        // Open dialog to end chat:
        setDialogOpen((prev) => true);
    };

    const dialogCloseHandler = (value) => {
        setDialogOpen((prev) => false);
        setDialogOption((prev) => value);
        setDocRef((prev) => null);
        navigate('/payment');
    };

    return loading ? (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '90vh', marginTop: '75px' }}
        >
            <CircularProgress size={100} />
        </Grid>
    ) : props.loggedIn && !loading ? (
        <Grid
            container
            sx={{ bgcolor: 'background.default' }}
            direction='column'
        >
            <Grid container item justifyContent='flex-end'>
                <IconButton onClick={xButtonHandler}>
                    <CloseIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid
                item
                alignItems='center'
                xs={12}
                sx={{ minHeight: '71vh', flexGrow: 1 }}
            >
                <ChatWindow
                    userID={userID}
                    docRef={docRef}
                    userName={userName}
                />
            </Grid>
            <Grid item container alignItems='flex-end'>
                <ChatBar docRef={docRef} userID={userID} userName={userName} />
            </Grid>
            <ExitDialog open={dialogOpen} onClose={dialogCloseHandler} />
        </Grid>
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
}
