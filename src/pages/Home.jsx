import React from "react";
import logo from '../assets/HomeHeader.png';
import { CssBaseline, Toolbar, Typography , Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Grid, CircularProgress } from "@mui/material";

export default function Home(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //setting up the user authentication

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


const [size, setSize] = useState({x: window.innerWidth, y: window.innerHeight});
	
const updateSize = () =>setSize({
    x: window.innerWidth,
    y: window.innerHeight
  });

  //resizing the image
useEffect(() => (window.onresize = updateSize), []);

	return loading ? (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "90vh" }}
    >
        <CircularProgress size={100} />
    </Grid>
) : !props.loggedIn ? ( 
      <div className="jia">
        <img src={logo} 
             alt={'logo'}
             width={size.x}
             sx={{
              display: 'flex' ,
             }}
        ></img>
        <Button className="btn" 
                onClick={() => navigate("/Login")}
                sx={{
                    position:'absolute',
                    top:'110%' ,
                    bottom:'14%',
                    fontSize:'20px',
                    left:'20%' , 
                    display: "flex",
                    backgroundColor:"darkslategray",
                    color:'white',
                    border:1,
                    borderRadius: '100px',
                    width:'fit-content',
                    height:'40px'
                  }}
                  
        >
          Click here to start</Button>
          <Typography>
          ⒸMediCo
          </Typography>
      </div> 
      ) : (

        //if user is already logged in... will go to the selection page to choose between doctor chat and and symptom 
    
        navigate("/selection")
  );
}