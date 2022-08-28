import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SymptomDeclaration from "./pages/SymptomDeclaration";
import DoctorChat from "./pages/DoctorChat";
import ProtectedPage from "./pages/ProtectedPage";
import DebugPage from "./pages/DebugPage";
import Selection from "./pages/Selection";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/symptomdeclaration"
                        element={<SymptomDeclaration />}
                    />
                    <Route path="/doctorchat" element={<DoctorChat />} />
                    <Route path="/protected" element={<ProtectedPage />} />
                    <Route path="/debug" element={<DebugPage />} />
                    <Route
                        path="/selection"
                        element={
                            <Selection
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
