import React, { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardAction,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from "mui/material";
import SelectionCard from "../components/SelectionCard";
import doctor_image from "../assets";
import symptom_declaration_image from "../assets";
import CanvasDraw from "react-canvas-draw";

export default function Selection(props) {
    const navigate = useNavigate();
    useEffect(() => {
        //Set up observer on user authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log("Authorization granted.");
                props.setLoggedIn(true);
            } else {
                // User is signed out
                console.log("Not authorized.");
                props.setLoggedIn(false);
            }
        });
    });

    const onClickHandler = (event) => {
        if (event.value == 0) {
            // Doctor Chat chosen
            navigate("/chat");
        }
        if (event.value == 1) {
            // Symptom Declaration chosen
            navigate("/symptomdeclaration");
        }
    };
    return props.loggedIn ? (
        <div>
            <Grid container>
                <Grid item>
                    <SelectionCard
                        image={doctor_image}
                        title="Chat with a doctor"
                        subtitle="Consult a doctor using live chat."
                    />
                </Grid>
                <Grid item>
                    <SelectionCard
                        image={symptom_declaration_image}
                        title="Declare symptoms"
                        subtitle="Indicate your symptoms using a visual diagram."
                    ></SelectionCard>
                </Grid>
            </Grid>
        </div>
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
}
