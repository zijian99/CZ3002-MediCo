import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SymptomDeclaration from './pages/SymptomDeclaration';
import DoctorChat from './pages/DoctorChat';
import ProtectedPage from './pages/ProtectedPage';
import DebugPage from './pages/DebugPage';
import Selection from './pages/Selection';
import Payment from './pages/PaymentPage';
import CardPayment from './pages/CardPayment';
import QRPage from './pages/QRPage';
import AfterPayment from './pages/AfterPayment';

let isFirefox;
const userAgentString = navigator.userAgent;
if (userAgentString.indexOf('Firefox') !== -1) {
    isFirefox = true;
}
isFirefox = false;

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    });

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/login'
                        element={
                            <Login
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path='/register'
                        element={
                            <Register
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path='/symptomdeclaration'
                        element={
                            <SymptomDeclaration
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path='/doctorchat'
                        element={
                            isFirefox ? (
                                <Home />
                            ) : (
                                <DoctorChat
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )
                        }
                    />
                    <Route
                        path='/protected'
                        element={
                            <ProtectedPage
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path='/debug'
                        element={
                            <DebugPage
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path='/selection'
                        element={
                            <Selection
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path='/payment'
                        element={
                            <Payment
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path='/qrcodepayment'
                        element={
                            <QRPage
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path='/cardpayment'
                        element={
                            <CardPayment
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path='/afterPayment'
                        element={
                            <AfterPayment
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
