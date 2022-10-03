import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { createChatHistory } from '../firestore functions.js';
import { serverTimestamp } from 'firebase/firestore';

// Initialize Mic:
let mic;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    mic = new SpeechRecognition();
    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = 'en-US';
} else {
    mic = null;
}

export default function ChatBar(props) {
    const [currentText, setCurrentText] = useState('');
    const [micEnabled, setMicEnabled] = useState(false);
    const [toolTipOpen, setToolTipOpen] = useState(false);

    const handleChange = (event) => {
        setCurrentText((currentText) => event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            return;
        } else if (event.key === 'Enter') {
            handleSend();
            event.preventDefault();
        }
    };

    const handleSend = () => {
        if (currentText === '') {
            // Empty message
            return;
        }
        setCurrentText((current) => '');
        // Send to database:
        /*---------------store msg into firestore when doc/patient hits enter---------*/
        const uDocRef = props.docRef.uDocRef;
        const dDocRef = props.docRef.dDocRef;
        if (uDocRef != null && dDocRef != null) {
            createChatHistory(
                uDocRef,
                dDocRef,
                serverTimestamp(),
                props.userName,
                currentText
            );
        } else {
            console.log('docRef is null');
        }
    };

    const toggleMic = () => {
        if (mic === null) {
            setToolTipOpen((prev) => !prev);
            return;
        }

        if (micEnabled) {
            // Switch off mic:
            setMicEnabled((prev) => false);
            mic.stop();
            mic.onend = () => {
                console.log('Stopped Mic');
            };
        } else {
            // Switch on mic:
            setMicEnabled((prev) => true);
            mic.start();
            mic.onend = () => {
                console.log('Continue listening');
                mic.start();
            };

            mic.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join('');
                console.log(transcript);
                setCurrentText(transcript);
                mic.onerror = (event) => {
                    console.log(event.error);
                };
            };
        }
    };

    return (
        <Grid
            container
            direction='row'
            alignItems='center'
            justifyContent='space-around'
        >
            <Grid item xs={8} sm={10} flexGrow='1'>
                <TextField
                    multiline
                    fullWidth={true}
                    value={currentText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    variant='filled'
                />
            </Grid>
            <Grid item ml={1}>
                {micEnabled ? (
                    <IconButton onClick={toggleMic} sx={{ color: 'red' }}>
                        <KeyboardVoiceIcon fontSize='large' />
                    </IconButton>
                ) : (
                    <Tooltip
                        open={toolTipOpen}
                        onOpen={() => setToolTipOpen(true)}
                        onClose={() => setToolTipOpen(false)}
                        disableHoverListener={true}
                        title={
                            <Typography variant='h6'>
                                Your browser does not support speech
                                recognition!
                            </Typography>
                        }
                        placement='top'
                        arrow={true}
                    >
                        <IconButton onClick={toggleMic}>
                            <KeyboardVoiceIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                )}
            </Grid>
            <Grid item ml={1}>
                <Button
                    variant='contained'
                    size='large'
                    onClick={handleSend}
                    sx={{ bgcolor: 'dodgerblue' }}
                >
                    SEND
                </Button>
            </Grid>
        </Grid>
    );
}
