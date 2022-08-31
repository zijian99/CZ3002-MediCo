import React from "react";
import logo from '../img/logo/home_header.png';
import { CssBaseline, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const preventDefault = (event) => event.preventDefault();

const scrollToIntro = () => {
    const viewPortOffSet = window.document
      .getElementById("introduction")
      .getBoundingClientRect();
    window.scrollTo({
      top: viewPortOffSet.top * 0.95 + window.scrollY,
      behavior: "smooth",
    });
  };
  
export default function Home() {

  const navigate = useNavigate();

	return(
      <div className="jia">
        <img src={logo} alt={'logo'}></img>
        <button className="btn" onClick={() => navigate("/Login")}>Click here to start</button>
    </div> 
    );
}