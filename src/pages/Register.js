import React, { useState } from 'react';
import { Typography, TextField, FormHelperText } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import { auth } from '../firebase';
import '@firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createUserDoc } from '../firestore functions.js';

export default function Register(props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [gender, setGender] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [age, setAge] = useState('');

    {
        /*const [submitted, setSubmitted] = useState(false);*/
    }
    const [error, setError] = useState(false);
    const [pwerror, setPwError] = useState(false);
    const [message, setMessage] = useState(false);
    const [acc, setAcc] = useState(false);
    const [emailerr, setEmailErr] = useState(false);
    /* const [emailtaken, setEmailTaken] = useState(false); */
    const [lenerr, setLenErr] = useState(false);
    const [pcerror, setPcErr] = useState(false);
    const [ageerror, setAgeError] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handlePostalCode = (e) => {
        setPostalCode(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handleGender = (e) => {
        setGender(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handleAge = (e) => {
        setAge(e.target.value);
        {
            /*setSubmitted(false);*/
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setPwError(false);
        setAcc(false);
        setMessage(false);
        setEmailErr(false);
        setLenErr(false);
        setPcErr(false);
        setAgeError(false);
        /* setEmailTaken(false); */
        /* const snapshot = await firestore.collection("Users").where("email", "==", email).get(); */
        if (
            name === '' ||
            email === '' ||
            password === '' ||
            cpassword === '' ||
            gender === '' ||
            postalcode === '' ||
            age === ''
        ) {
            return setError(true);
        } else if (password.length < 6) {
            return setLenErr(true);
        } else if (password !== cpassword) {
            return setPwError(true);
        } else if (!isValidEmail(email)) {
            return setEmailErr(true);
        } else if (!Number(postalcode) || postalcode.toString().length !== 6) {
        /* else if (snapshot.empty==false)
			{
				return setEmailTaken(true);
			} */
            return setPcErr(true);
        } else if (age <= 0) {
            return setAgeError(true);
        }
        try {
            register(email, password);
            return setMessage(true);
        } catch {
            return setAcc(true);
        }
    };

    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                /*-----------NEED TO EXTRACT DATA FROM USER INPUT------*/
                createUserDoc(user.uid, {
                    username: name,
                    email: email,
                    age: age,
                    gender: gender,
                    postal_code: postalcode,
                });
                /*-----------NEED TO EXTRACT DATA FROM USER INPUT------*/
                navigate('/');
            })
            .catch((error) => {
                props.setLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    const successMessage = () => {
        return (
            <div
                className='message'
                style={{
                    display: message ? '' : 'none',
                }}
            >
                <h1>User {name} Successfully Registered!</h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className='error'
                style={{
                    display: error ? '' : 'none',
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    const lenMessage = () => {
        return (
            <div
                className='lenerr'
                style={{
                    display: lenerr ? '' : 'none',
                }}
            >
                <h1>Password must be of at least 6 characters </h1>
            </div>
        );
    };

    const pwerrorMessage = () => {
        return (
            <div
                className='pwerror'
                style={{
                    display: pwerror ? '' : 'none',
                }}
            >
                <h1>Passwords do not match!</h1>
            </div>
        );
    };
    const AccNotCreated = () => {
        return (
            <div
                className='acc'
                style={{
                    display: acc ? '' : 'none',
                }}
            >
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
                className='emailerr'
                style={{
                    display: emailerr ? '' : 'none',
                }}
            >
                <h1>Invalid Email!</h1>
            </div>
        );
    };

    /*  const emailTakenMessage = () => {
			return (
			  <div
				className="emailtaken"
				style={{
				  display: emailtaken ? '' : 'none',
				}}>
				<h1>Email already exists!</h1>
			  </div>
			);
		  }; */
    const invalidPostalCode = () => {
        return (
            <div
                className='pcerror'
                style={{
                    display: pcerror ? '' : 'none',
                }}
            >
                <h1>Only 6 digits postal code accepted!</h1>
            </div>
        );
    };

    const invalidAge = () => {
        return (
            <div
                className='ageerror'
                style={{
                    display: ageerror ? '' : 'none',
                }}
            >
                <h1>Invalid age!</h1>
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
                <Typography level='h4' component='h1'>
                    <b>Register Here</b>
                </Typography>
            </div>

            <div className='messages'>
                {errorMessage()}
                {successMessage()}
                {pwerrorMessage()}
                {AccNotCreated()}
                {emailerrorMessage()}
                {lenMessage()}
                {invalidPostalCode()}
                {invalidAge()}
                {/* {emailTakenMessage()} */}
            </div>

            <TextField
                // html input attribute
                type='name'
                placeholder='Name'
                // pass down to FormLabel as children
                label='Username'
                onChange={handleName}
            />

            <TextField
                type='email'
                placeholder='medico@email.com'
                label='Email'
                onChange={handleEmail}
            />

            <TextField
                type='password'
                placeholder='password'
                label='Password'
                onChange={handlePassword}
            />

            <TextField
                // html input attribute
                type='password'
                placeholder='Confirm Password'
                // pass down to FormLabel as children
                label='Confirm Password'
                onChange={handleCPassword}
            />

            <TextField
                // html input attribute
                type='text'
                placeholder='6 Digits Postal Code'
                // pass down to FormLabel as children
                label='Postal Code'
                onChange={handlePostalCode}
            />

            <TextField
                // html input attribute
                type='number'
                placeholder='Age'
                // pass down to FormLabel as children
                label='Age'
                onChange={handleAge}
            />

            <FormLabel>Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                type='gender'
                onChange={handleGender}
            >
                <FormControlLabel
                    value='female'
                    control={<Radio />}
                    label='Female'
                />
                <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label='Male'
                />
            </RadioGroup>

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
