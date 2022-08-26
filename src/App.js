import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SymptomDelcation from "./pages/SymptomDeclaration";
import DoctorChat from "./pages/DoctorChat";
import ProtectedPage from "./pages/ProtectedPage";
function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Login' element={<Login loggedIn={loggedIn} setLoggedIn={loggedIn}/>} />
					<Route path='/Register' element={<Register />} />
					<Route path='/SymptomDelcation' element={<SymptomDelcation />} />
					<Route path='/DoctorChat' element={<DoctorChat />} />
					<Route path='/protected' element={<ProtectedPage/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
