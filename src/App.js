import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Navbar from "./Navbar";
import SymptomDeclaration from "./pages/SymptomDeclaration";
import DoctorChat from "./pages/DoctorChat";
import ProtectedPage from "./pages/ProtectedPage";
import DebugPage from "./pages/DebugPage";
import Selection from "./pages/Selection";
import ChangePassword from "./pages/ChangePassword";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	let Component
	switch(window.location.pathname){
		case "./pages/Home":
			Component = Home
			break
		case "./pages/Login":
			Component = Login
			break
		case "./pages/Register":
			Component = Register
			break
		case "./pages/About":
			Component = About
			break
        case "./pages/DoctorChat":
            Component = DoctorChat
            break
        case "./pages/ChangePassword":
            Component = ChangePassword
            break
		default:
			Component = Home
			break

	}
	
	return (
		<>
		<Navbar 
		 	loggedIn={loggedIn}
		 	setLoggedIn={setLoggedIn}
		/>
        <div className='container'>
			{Component}
		</div>
		
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                                />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Register
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/changepassword"
                        element={
                            <ChangePassword
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/symptomdeclaration"
                        element={
                            <SymptomDeclaration
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/doctorchat"
                        element={
                            <DoctorChat
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/protected"
                        element={
                            <ProtectedPage
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/debug"
                        element={
                            <DebugPage
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/selection"
                        element={
                            <Selection
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <About/>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
		</>
    );
}
export default App;