import React, { useState , useEffect} from "react";
import { TextField, Typography , Alert , Grid , CircularProgress} from "@mui/material";
import {Sheet} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {onAuthStateChanged, updatePassword , getAuth , reauthenticateWithCredential , EmailAuthProvider} from "firebase/auth";



export default function ChangePassword(props) {
    const [newpassword, setNewPassword] = useState("");
    const [curpassword, setCurPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [curerror, setCurError] = useState(false);
	  const [message, setMessage] = useState(false);
    const [format, setFormat] = useState(false);


    //need to handle the change of curpassword and new
    //check if currpassword match.. if yes then check if newpassword or not


    //import { getAuth, updatePassword } from "firebase/auth";

    
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
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('Pressed on Enter Key');
          changingPassword(curpassword,newpassword);
          
        }
      };
    

    //change password
    const changingPassword = (currpassword , newpassword) => {
      setCurError(false);
      setMessage(false);
      setFormat(false);

      if(newpassword==""){
        setFormat(true);
        return;
      }

      const user = getAuth().currentUser;
      const email = user.email;
      var cred = EmailAuthProvider.credential(
        email,
        currpassword
      );
      //current password has no error  

      reauthenticateWithCredential(user, cred).then(() => {
        // User sucessful re-authenticated.
        console.log("Correct current password");


        //update authenticated user's password
        updatePassword(user , newpassword).then(() => {
        console.log("Successful password change");
        setMessage(true);
        // Update successful.

        }).catch((error) => {
        // An error ocurred when updating password
        console.log("Unsuccessful password change");
      })

      }).catch((error) => {
        // An error ocurred
        // ...
        setCurError(true);
        console.log("Wrong current password");
        
      });
    };

    const successMessage = () => {
		return (
		  <div
			className="message"
			style={{
			  display: message ? '' : 'none',
			}}>
      <Alert severity="success">
      Successful Password Change!
      </Alert>
		  </div>

  
		);

    
	  };

    const errorMessage = () => {
		return (
		  <div
			className="error"
			style={{
			  display: curerror ? '' : 'none',
			}}>
      <Alert severity="error">
        Current Password does not match!
      </Alert>
		  </div>
		);
	  };

    const errorFormat = () => {
      return (
        <div
        className="format"
        style={{
          display: format ? '' : 'none',
        }}>
        <Alert severity="error">
          New Password cannot be empty!!
        </Alert>
        </div>
      );
      };

    
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
    ): (
    <Sheet
        sx={{
            maxWidth: 400,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
        }}
        ><div>
        <Typography level="h4" component="h1">
            <b>Change Password</b>
        </Typography>
        </div>
        <TextField
        type="password"
        placeholder="Current Password"
        label="Current Password"
        onChange={(event) => {
            setCurPassword(event.target.value);
        }}
        onKeyDown={handleKeyDown} 
        />
        <TextField
        type="password"
        placeholder="New Password"
        label="New Password"
        onChange={(event) => {
            setNewPassword(event.target.value);
        }}
        onKeyDown={handleKeyDown} 
        />
        <button
        sx={{
            mt: 10, // margin top
        }}
        onClick={() => changingPassword(curpassword , newpassword)}
        >
        Change Password
        </button>  
        <br/>
        <br/>
        <div className="messages">
			{errorMessage()}{errorFormat()}{successMessage()}
		</div>
    </Sheet>
    );
}