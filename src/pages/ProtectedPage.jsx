import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Grid, CircularProgress } from "@mui/material";

export default function ProtectedPage(props) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //Set up observer on user authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log("Authorization granted.");
                props.setLoggedIn(true);
                setLoading(false);
            } else {
                // User is signed out
                console.log("Not authorized.");
                props.setLoggedIn(false);
                setLoading(false);
            }
        });
    });
    return loading ? (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "90vh" }}
        >
            <CircularProgress size={60} />
        </Grid>
    ) : props.loggedIn ? (
        <div>
            <h1>Protected content</h1>
        </div>
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
}
