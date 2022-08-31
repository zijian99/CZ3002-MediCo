import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SymptomDelcation from "./pages/SymptomDeclaration";
import DoctorChat from "./pages/DoctorChat";
import Navbar from "./Navbar";

function App() {
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

	}

	return (
		<>
		<Navbar /><div className='container'>
			{Component}
		</div>
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Login' element={<Login />} />
					<Route path='/Register' element={<Register />} />
					<Route path='/SymptomDelcation' element={<SymptomDelcation />} />
					<Route path='/DoctorChat' element={<DoctorChat />} />
				</Routes>
			</BrowserRouter>
		</div>
		</>
	);
}
export default App;
