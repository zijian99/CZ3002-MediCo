import React, { useState , useEffect} from "react";
import { TextField, Typography , Alert , Grid , CircularProgress} from "@mui/material";
import {Sheet} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { auth , db} from "../firebase";
import {onAuthStateChanged , updateEmail , getAuth , EmailAuthProvider , reauthenticateWithCredential} from "firebase/auth";
import { doc, getDoc , updateDoc} from "firebase/firestore";



export default function EditProfile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
	const [postalcode, setPostalCode] = useState('');
  const [currentpassword , setCurrentPassword] = useState('');


  const [loading, setLoading] = useState(true);

  const [namemessage, setNameMessage] = useState(false);
  const [emailvmessage, setEmailVMessage] = useState(false);
  const [emailmessage, setEmailMessage] = useState(false);
  const [postalcodemessage, setPostalCodeMessage] = useState(false);


  const [error, setError] = useState(false);
	const [message, setMessage] = useState(false); //success Message
  const [format, setFormat] = useState(false);



    //import { getAuth, updatePassword } from "firebase/auth";

    
   useEffect(() => {
        //Set up observer on user authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                //console.log("Authorization granted.");
                props.setLoggedIn(true);
				        setLoading(false);     
                getUser();
            
            } else {
                // User is signed out
                //console.log("Cannot access edit page");
                props.setLoggedIn(false);
				        setLoading(false);
            }
        });
    },[]);
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('Pressed on Enter Key');
          savingInfo(name , email , postalcode , currentpassword);
        }
      };

      async function getUser() {
        //get the user's current information
        const user = getAuth().currentUser;
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmail(user.email);
          //console.log(user.uid);
          setName(docSnap.data().username);
          setPostalCode(docSnap.data().postal_code);
          } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };

      
    

    async function savingInfo (name , email , postalcode, currentpassword) {
        setNameMessage(false);
        setEmailMessage(false);
        setEmailVMessage(false);
        setPostalCodeMessage(false);
        setMessage(false);
        setError(false);
        setFormat(false);
      
        //do validation of information

        console.log("-----NEW INFO-------")
        console.log("name:" , name)
        console.log("email:" , email)
        console.log("postalcode:" , postalcode)
  

        if(name==="" || email==="" || postalcode==="" || currentpassword===""){
          setFormat(true);
          console.log("Error: empty fields");
          return
        }
        
        //check if check if email format is correct
        if(!isValidEmail(email)){
          setEmailVMessage(true);
          console.log("Error: invalid email format");
          return
        }

       
        //check if postalcode valid
        if(!Number(postalcode)){
          setPostalCodeMessage(true);
          console.log("Error: invalid postal code format");
          return
        }
     
        if(postalcode.length!=6){
          setPostalCodeMessage(true);
          console.log("Error: postal code length too short");
          return
        }

    
        console.log("postalcodemessage: " , postalcodemessage , " email: " , emailvmessage , " format: " , format);
        //if all the format and checks are passed
        if(postalcodemessage===false && emailvmessage===false && format===false){
          try{
            //if email is check if email is already in use, if not.. update into the firestore authentication
            await updatingEmail(email , currentpassword);
        }
        catch{
            setError(true);
        }
        }
        

    };

    async function updateFirebaseInfo(name , newemail , postalcode){
      const user = getAuth().currentUser;
      const docRef = doc(db, "Users", user.uid);

        if(emailmessage===false){
          await updateDoc(docRef , {email: newemail})
          console.log("updated email into firestore");
        }
        else if (emailmessage===true){
          console.log("cant update email");
          return
        }

        await updateDoc(docRef, {
          username: name , 
          postal_code: postalcode
        })
        console.log("updated other info into firestore");
        setMessage(true);
        
    }

    function updatingEmail(newemail , currentpassword){
        const user = getAuth().currentUser;

        var cred = EmailAuthProvider.credential(
          user.email,
          currentpassword
        );
        console.log(user.email)
        console.log(currentpassword)
        console.log("i guess credential?" + cred)
        
        reauthenticateWithCredential(user, cred).then(() => {
          // User sucessful re-authenticated.
          console.log("Reauthenticated");
          console.log("old email: ", user.email)
          console.log("new email" , newemail);
  
          //update authenticated user's password
          updateEmail(user , newemail).then(() => {
          //successfully updated into firestore authentication
          console.log("Successful email change in authentication");
          setEmailMessage(false);
          updateFirebaseInfo(name , newemail , postalcode)
          // Update successful.
  
          }).catch((error) => {
          // An error ocurred when updating email
          console.log("Unsuccessful email change in authentication");
          setEmailMessage(true);
        })
  
        }).catch((error) => {
          // An error ocurred
          setError(true);
          console.log("Failed re-authentication");
          
        });

    }

    /*async function getUser(){
        const user = getAuth().currentUser;

        //get the user's current information
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEmail(user.email);
          //console.log(user.uid);
          setName(docSnap.data().username);
          setPostalCode(docSnap.data().postal_code);
          setAge(docSnap.data().age);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }


    }*/


    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }


    //message alerts
    const successMessage = () => {
		return (
		  <div
			className="message"
			style={{
			  display: message ? '' : 'none',
			}}>
            <Alert severity="success">
             Profile Updated!
            </Alert>
		  </div>
		);
	  };

    const errorMessage = () => {
		return (
		  <div
			className="error"
			style={{
			  display: error ? '' : 'none',
			}}>
        <Alert severity="error">
            Error in updating!
        </Alert>
		</div>
		);
	  };

    const errorFormat = () => {
      return (
        //empty fields
        <div
        className="format"
        style={{
          display: format ? '' : 'none',
        }}>
        <Alert severity="error">
          Fields cannot be empty!
        </Alert>
        </div>
      );
      };

    const errorName = () => {
        return (
          //empty fields
          <div
          className="format"
          style={{
            display: namemessage ? '' : 'none',
          }}>
          <Alert severity="error">
            Username already in use! Try again!
          </Alert>
          </div>
        );
    };

    const errorEmailV = () => {
        return (
          //empty fields
          <div
          className="format"
          style={{
            display: emailvmessage ? '' : 'none',
          }}>
          <Alert severity="error">
            Email format error!
          </Alert>
          </div>
        );
    };

    const errorEmail = () => {
        return (
          //empty fields
          <div
          className="format"
          style={{
            display: emailmessage ? '' : 'none',
          }}>
          <Alert severity="error">
            Email already in use! Try again!
          </Alert>
          </div>
        );
    };

    const errorPostalCode = () => {
        return (
          //empty fields
          <div
          className="format"
          style={{
            display: postalcodemessage ? '' : 'none',
          }}>
          <Alert severity="error">
            Invalid Postal Code
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
            <b>Edit Profile</b>
        </Typography>
        </div>

        <TextField
             id="outlined-required"
             label="UserName"
             defaultValue = {name}
             onChange={event => setName(event.target.value)}
        />

        <TextField
            id="outlined-email"
            type="email"
            label="Email"
            defaultValue={email}
            onChange={(event) => {
              setEmail(event.target.value);}}
        />
        
        <TextField
            id="outlined-postalcode"
            type="text"
            label="Postal Code"
            defaultValue={postalcode}
            onChange={(event) => {
                setPostalCode(event.target.value);
            }}
        />

      <TextField
        type="password"
        placeholder="Current Password"
        label="Current Password"
        onChange={(event) => {
          setCurrentPassword(event.target.value);
        }}
        onKeyDown={handleKeyDown} 
        />

        <button
        sx={{
            mt: 10, // margin top
        }}
        onClick={() => savingInfo(name , email , postalcode, currentpassword)}
        >
        Save
        </button>  
        <br/>
        <br/>
        <div className="messages">
			{errorMessage()}{errorFormat()}{successMessage()}
            {errorName()}{errorEmail()}{errorEmailV()}{errorPostalCode()}
		</div>
    </Sheet>
    );
}