import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea,
} from "@mui/material";

export default function SelectionCard(props) {
    return (
        <Card
            sx={{
                maxWidth: 500,
                borderRadius: 16,
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.1)",
                },
            }}
            onClick={props.onClick}
        >
            <CardActionArea
                sx={{ minheight: 600, maxWidth: 600, borderRadius: 5 }}
            >
                <CardMedia
                    component="img"
                    height="400"
                    image={props.image}
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
