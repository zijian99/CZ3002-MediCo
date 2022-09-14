import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export default function ChatBar(props) {
    const [currentText, setCurrentText] = useState('');

    const handleChange = (event) => {
        setCurrentText((currentText) => event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key == 'Enter' && event.shiftKey) {
            return;
        } else if (event.key == 'Enter') {
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
    };

    const handleMic = () => {
        // Change textfield state based on audio
    };

    return (
        <Grid
            container
            direction='row'
            alignItems='center'
            justifyContent='flex-start'
            spacing={3}
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
                <IconButton onClick={handleMic}>
                    <KeyboardVoiceIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid item ml={1}>
                <Button variant='filled' size='large' onClick={handleSend}>
                    SEND
                </Button>
            </Grid>
        </Grid>
    );
}
