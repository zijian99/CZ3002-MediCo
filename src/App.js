import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SymptomDelcation from "./pages/SymptomDeclaration";
import DoctorChat from "./pages/DoctorChat";
import Symptom from "./pages/Symptom";
import DeclareSymptoms from "./pages/DeclareSymptoms";
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Login' element={<Login />} />
					<Route path='/Register' element={<Register />} />
					<Route path='/SymptomDelcation' element={<SymptomDelcation />} />
					<Route path='/DoctorChat' element={<DoctorChat />} />
					<Route path='/Symptom' element={<Symptom />} />
					<Route path='/DeclareSymptoms' element={<DeclareSymptoms />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
