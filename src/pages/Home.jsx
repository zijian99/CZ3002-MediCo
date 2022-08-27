import React from "react";

import {useNavigate} from 'react-router-dom';

const preventDefault = (event) => event.preventDefault();

export default function Home() {
    const navigate = useNavigate();

    function navigateLogin(){
        navigate('/Login');
    }
  

    function navigateRegister() {
    navigate('/Register');
    }

	return(
            <div>
              <div>
                <button onClick={navigateLogin}>Login</button>
                <br/>
                <button onClick={navigateRegister}>Register</button>
              </div>
            </div>
    );
}
