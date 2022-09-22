import { Typography } from "@mui/joy"
import * as React from 'react';
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Toolbar, AppBar , Button} from "@mui/material"
import { Link } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import logo from './img/logo/facebook_cover_photo_1.png'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function Navbar(props) {



	const [loading, setLoading] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const pages = ["Login", "Register" , "About"];
	const loggedinpages = ["Doctor Chat" , "Symptom Declaration" , "Find GP" , "About"]
	
	const getLink = (item) => {
		var result = item.split(' ').join('')
		if(result==="SymptomDeclaration"){
			return "SymptomDelcation"
		}
		return result;
	};

	
	  const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handleClose = () => {
		setAnchorEl(null);
	  };

	  //logout the user
	  const logout = () => {
		auth.signOut();
		console.log("User signed out");
		props.setLoggedIn(false);
	  };

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
        <AppBar>
			<Toolbar
			sx={{backgroundColor:'#00172D'}}>
  			<Button href="/"
		  	sx={{display: "flex" , width:'150px', minWidth: '150px' , border: 'none' }}
  			>
  			<img src={logo} alt={"logo"} height={75}></img>
  			</Button>
			</Toolbar>
		</AppBar>
	): !props.loggedIn ? (//display if user is logged out 

  	<AppBar position="static">
  	<Toolbar
	  	sx={{backgroundColor:'#00172D'}}
  	>
  	<Button href="/"
		  sx={{display: "flex" , width:'150px', minWidth: '150px' , border: 'none' }}
  	>
  	<img src={logo} alt={"logo"} height={75}></img>
  	</Button>
  	<div style={{ display: "flex", flex: "1" }}>
	  	{pages.map((item) => (
			<Button
				key={item}
			  	sx={{ justifyContent: "center", 
			  	color: "inherit", 
			  	gap:'80%',
				mx: "auto",
			  	border: 'none'
			   	}}
			  	href={"/" + getLink(item)}
			  	variant='outlined'
			>
			<Typography
				sx={{
					display: "flex",
					flex: "0.5",
					marginLeft: 7,
					marginRight: 7,
				  }}
				color={"black"}
				>
					{item}
			</Typography>
		  	</Button>
	  	))}
  	</div>
	</Toolbar>
	</AppBar>) :(
	//this portion is if the user is logged in
    <AppBar position="static">
		<Toolbar
		sx={{backgroundColor:'#00172D'}}
		>
			<Button href="/"
				sx={{display: "flex" , width:'150px', minWidth: '150px' , border: 'none'
			}}
			>
			<img src={logo} alt={"logo"} height={75}></img>
			</Button>

			<div style={{ display: "flex", flex: "1" }}>
				{loggedinpages.map((item) => (
					<Button
						key={item}
						sx={{ justifyContent: "center", 
						color: "inherit", 
						gap:'80%',
      					mx: "auto",
						border: 'none'
						 }}
						href={"/" + getLink(item)}
						variant='outlined'
					>
						<Typography
							sx={{
								display: "flex",
								flex: "0.5",
								marginLeft: 7,
								marginRight: 7,
							}}
							color={"black"}
						>
							{item}
						</Typography>
					</Button>
				))}
			</div>
			<div>
			<IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
				<Link
					href={"/"}
					underline='none'
					color="inherit"
				>
					<MenuItem
					>
					Edit Profile
					</MenuItem>
				</Link>

				<Link
					href={"/changepassword"}
					underline='none'
					color="inherit"
				>
					<MenuItem
					> 
					Change Password
					</MenuItem>
				</Link>
			
				<Link
					href={"/"}
					underline='none'
					color="inherit"
				>
					<MenuItem
					onClick={logout}
					> 
					Logout
					</MenuItem>
				</Link>
              </Menu>
			</div>
		</Toolbar>
    </AppBar>
  ) ;
}

