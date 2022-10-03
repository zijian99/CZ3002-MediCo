import React, { useState , useEffect} from "react";
import { TextField, Typography , Alert , Grid , CircularProgress , Radio , RadioGroup , FormLabel , FormControlLabel} from "@mui/material";
import {Sheet} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { auth , db} from "../firebase";
import {onAuthStateChanged , updateEmail , getAuth , EmailAuthProvider , reauthenticateWithCredential} from "firebase/auth";
import { doc, Firestore, getDoc , updateDoc} from "firebase/firestore";



export default function EditProfile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [postalcode, setPostalCode] = useState('');
	const [age, setAge] = useState('');
  const [curpassword , setCurPassword] = useState('');


  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [namemessage, setNameMessage] = useState(false);
  const [emailvmessage, setEmailVMessage] = useState(false);
  const [emailmessage, setEmailMessage] = useState(false);
  const [postalcodemessage, setPostalCodeMessage] = useState(false);
  const [agemessage, setAgeMessage] = useState(false);


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
    });
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('Pressed on Enter Key');
        
          
        }
      };

      
    

    const savingInfo = (name , email , postalcode , age , gender) => {
        setNameMessage(false);
        setEmailMessage(false);
        setPostalCodeMessage(false);
        setAgeMessage(false);
        //do validation of information

        if(name==="" || email==="" || postalcode==="" || age==="" || gender==="")
            setFormat(true);
        
        //check if new username is in the db

        //check if check if email format is correct
        if(!isValidEmail)
            setEmailVMessage(true);

        //check if email alr in db

        //check if postalcode valid
        if(!Number(postalcode)||(postalcode.toString().length!=6))
            setPostalCodeMessage(true);

        //check if valid age
        if(age<=0)
            setAgeMessage(true);
    
        try{
            updatingEmail(email , curpassword);
            updateFirebaseInfo(name , email, postalcode , age , gender);
            //setMessage(true);
        }
        catch{
            setError(true);
        }

    };

    async function updateFirebaseInfo(name , email , postalcode , age , newgender){
      const user = getAuth().currentUser;
      const docRef = doc(db, "Users", user.uid);

      await updateDoc(docRef, {
        username: name ,
        email: email , 
        postal_code: postalcode ,
        age: age ,
        gender: newgender
      })
      console.log("i think we updated?");
        
    }

    function updatingEmail(newemail , curpassword){
        const user = getAuth().currentUser;

        var cred = EmailAuthProvider.credential(
          user.email,
          curpassword
        );
        console.log(user.email)
        
        reauthenticateWithCredential(user, cred).then(() => {
          // User sucessful re-authenticated.
          console.log("Reauthenticated");
          console.log("old email: ",user.email)
          console.log("new email" , newemail);
  
          //update authenticated user's password
          updateEmail(user , newemail).then(() => {
          console.log("Successful email change");
          // Update successful.
  
          }).catch((error) => {
          // An error ocurred when updating email
          console.log("Unsuccessful email change");
        })
  
        }).catch((error) => {
          // An error ocurred
          // ...
          setError(true);
          console.log("Failed re-authentication");
          
        });

    }

    async function getUser(){
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


    }


    
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

    const errorAge = () => {
        return (
          //empty fields
          <div
          className="format"
          style={{
            display: agemessage ? '' : 'none',
          }}>
          <Alert severity="error">
            Age out of range
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
             id="outlined-name"
             type="text"
             label="UserName"
             defaultValue={name}
             onChange={(event) => {
                 setName(event.target.value);
             }}
        />

        <TextField
            id="outlined-email"
            type="email"
            label="Email"
            defaultValue={email}
            onChange={(event) => {setEmail(event.target.value);}}
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
            id="outlined-age"
            type="number"
            defaultValue={age}
            label="Age"
			      onChange={(event) => {
                setAge(event.target.value);
            }}
        />

        <FormLabel>Gender</FormLabel>
		<RadioGroup
			row
			aria-labelledby="demo-row-radio-buttons-group-label"
			name="row-radio-buttons-group"
			type="gender"
			onChange={(event) => {
                setGender(event.target.value);
            }}
		>
		<FormControlLabel value="female" control={<Radio />} label="Female" />
		<FormControlLabel value="male" control={<Radio />} label="Male" />
		</RadioGroup>


      <TextField
        type="password"
        placeholder="Current Password"
        label="Current Password"
        onChange={(event) => {
            setCurPassword(event.target.value);
        }}
        onKeyDown={handleKeyDown} 
        />

        <button
        sx={{
            mt: 10, // margin top
        }}
        onClick={() => savingInfo(name , email , postalcode , age , gender)}
        >
        Save
        </button>  
        <br/>
        <br/>
        <div className="messages">
			{errorMessage()}{errorFormat()}{successMessage()}
            {errorName()}{errorEmail()}{errorEmailV()}{errorPostalCode()}{errorAge()}
		</div>
    </Sheet>
    );
}