import {
    Button,
    Dialog,
    DialogTitle,
    Box,
    Grid,
    DialogActions,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function ExitDialog(props) {
    const handleClose = (value) => {
        props.onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle sx={{ bgcolor: 'secondary.main' }}>
                <Typography color='secondary.contrastText'>
                    Are you sure you want to exit the chat?
                </Typography>
            </DialogTitle>
            <DialogActions sx={{ bgcolor: 'secondary.main' }}>
                <Button
                    sx={{ marginRight: 1 }}
                    variant='contained'
                    onClick={() => {
                        handleClose(true);
                    }}
                >
                    Yes
                </Button>
                <Button
                    variant='contained'
                    onClick={() => {
                        handleClose(false);
                    }}
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}
