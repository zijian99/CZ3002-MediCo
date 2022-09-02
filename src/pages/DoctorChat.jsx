import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Grid, CircularProgress, Button } from "@mui/material";
import ChatBar from "../components/ChatBar.jsx";
import ChatScreen from "../components/ChatScreen.jsx";

export default function DoctorChat(props) {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    //Set up observer on user authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("Authorization granted.");
        props.setLoggedIn(true);
        // Call users collection to get username
        //setUserName(...)
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
    <Grid container direction="column" justifyContent="flex-start">
      <Grid item xs={1} sx={{ minHeight: "80vh" }}>
        <ChatScreen userName={userName} />
      </Grid>
      <Grid item xs={6} alignItems="flex-end" justifyContent="flex-end">
        <ChatBar />
      </Grid>
    </Grid>
  ) : (
    <div>
      <h1>Not logged in</h1>
    </div>
  );
}
