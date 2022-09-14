import React, {useState} from "react";
import { Typography, TextField } from "@mui/material";
import Sheet from '@mui/joy/Sheet';
import { auth , db} from "../firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCPassword] = useState('');

	{/*const [submitted, setSubmitted] = useState(false);*/}
	const [error, setError] = useState(false);
	const [pwerror, setPwError] = useState(false);
	const [message, setMessage] = useState(false);
	const [acc, setAcc] = useState(false);
	const [emailerr, setEmailErr] = useState(false);
	const [lenerr, setLenErr] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
		{/*setSubmitted(false);*/}
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
		{/*setSubmitted(false);*/}
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		{/*setSubmitted(false);*/}
	};
	
	const handleCPassword = (e) => {
		setCPassword(e.target.value);
		{/*setSubmitted(false);*/}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);
		setPwError(false);
		setAcc(false);
		setMessage(false);
		setEmailErr(false);
		setLenErr(false);
			if (name === '' || email === '' || password === ''|| cpassword==='') {
				return setError(true);
			}
			else if (password.length <6)
			{
				return setLenErr(true);
			}
			else if (password!=cpassword)
			{
				return setPwError(true);
			}
			else if (!isValidEmail(email)) {
				return setEmailErr(true);
			}
			try
			{	
				register(email,password);
				return setMessage(true);
			}
			catch 
			{
				return setAcc(true);
			}
	};


	const register = (email,password) => {
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			db.collection('Users').doc(user.uid).set({
            		username: "Default user",
            		gender: " ",
            		age: " ",
            		location: " ",
        		});
			navigate("/");
		})
  		.catch((error) => {
   		 const errorCode = error.code;
   		 const errorMessage = error.message;
    // ..
  });
	}


	const successMessage = () => {
		return (
		  <div
			className="message"
			style={{
			  display: message ? '' : 'none',
			}}>
			<h1>User {name} Successfully Registered!</h1>
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
			<h1>Please enter all the fields</h1>
		  </div>
		);
	  };

	  const lenMessage = () => {
		return (
		  <div
			className="lenerr"
			style={{
			  display: lenerr ? '' : 'none',
			}}>
			<h1>Password must be of at least 6 characters </h1>
		  </div>
		);
	  };

	  const pwerrorMessage = () => {
		return (
		  <div
			className="pwerror"
			style={{
			  display: pwerror ? '' : 'none',
			}}>
			<h1>Passwords do not match!</h1>
		  </div>
		);
	  }
		const AccNotCreated = () => {
		 	return (
				<div
					className="acc"
					style={{
					display: acc ? '' : 'none',
					}}>
					<h1>Account cannot be created!</h1>
				</div>
			);
		};

		function isValidEmail(email) {
			return /\S+@\S+\.\S+/.test(email);
		}

		const emailerrorMessage = () => {
			return (
			  <div
				className="emailerr"
				style={{
				  display: emailerr ? '' : 'none',
				}}>
				<h1>Invalid Email!</h1>
			  </div>
			);
		  };

	  return (
		<Sheet
		sx={{
			maxWidth: 400,
			mx: 'auto', // margin left & right
			my: 4, // margin top & botom
			py: 3, // padding top & bottom
			px: 2, // padding left & right
			display: 'flex',
			flexDirection: 'column',
			gap: 2,
			borderRadius: 'sm',
			boxShadow: 'md',
		  }}
		>

		<div>
          <Typography level="h4" component="h1">
            <b>Register Here</b>
          </Typography>
        </div>

		<div className="messages">
			{errorMessage()}
			{successMessage()}
			{pwerrorMessage()}
			{AccNotCreated()}
			{emailerrorMessage()}
			{lenMessage()}
		</div>
	 
		<TextField
            // html input attribute
            type="name"
            placeholder="Name"
            // pass down to FormLabel as children
            label="Username"
			onChange={handleName}
        />

		<TextField
            type="email"
            placeholder="medico@email.com"
            label="Email"
            onChange={handleEmail}
        />

		<TextField
            type="password"
            placeholder="password"
            label="Password"
            onChange={handlePassword}
        />

		<TextField
            // html input attribute
            type="password"
            placeholder="Confirm Password"
            // pass down to FormLabel as children
            label="Confirm Password"
			onChange={handleCPassword}
        />
	 
	 	<button
            sx={{
            mt: 10, // margin top
            }}
			onClick={handleSubmit} 
		>
        Register
        </button>
      </Sheet>
	  );

}