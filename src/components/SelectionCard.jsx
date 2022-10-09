import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea,
} from '@mui/material';

export default function SelectionCard(props) {
    return (
        <Card
            sx={{
                width: '60vh',
                borderRadius: 10,
                transition: '0.2s',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            }}
            onClick={props.onClick}
        >
            <CardActionArea sx={{ borderRadius: 5 }}>
                <CardMedia
                    component='img'
                    sx={{ maxHeight: '40vh' }}
                    image={props.image}
                    alt=''
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {props.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {props.subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
