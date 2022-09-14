import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DoctorChat from "./pages/DoctorChat";

import DeclareSymptoms from "./pages/DeclareSymptoms";
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Login' element={<Login />} />
					<Route path='/Register' element={<Register />} />
				
					<Route path='/DoctorChat' element={<DoctorChat />} />
				
					<Route path='/DeclareSymptoms' element={<DeclareSymptoms />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
