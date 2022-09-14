import React from "react";
import logo from '../img/logo/home_header.png';
import { CssBaseline, Toolbar, Typography , Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

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

	return !props.loggedIn ? ( 
      <div className="jia">
        <img src={logo} 
             alt={'logo'}
             sx={{
              display: 'flex' ,
              width: '100%' , 
              height:'100%'
             }}
        ></img>
        <Button className="btn" 
                onClick={() => navigate("/Login")}
                sx={{
                    position:'absolute',
                    top:'170%' ,
                    bottom:'14%',
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

        //if user is already logged in... will have page suggesting us to go find out more about web
        <div className="jia">
        <img src={logo} 
         alt={'logo'}
         sx={{
          display: 'flex' ,
          width: '100%' , 
          height:'100%'
         }}
        ></img>
        <Button className="btn" 
            onClick={() => navigate("/About")}
            sx={{
                position:'absolute',
                top:'170%' ,
                bottom:'14%',
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
          Find Out About Us</Button>
      <Typography>
      ⒸMediCo
      </Typography>
  </div> 
  );
}