
import {useNavigate} from 'react-router-dom';
import Card from "react-credit-cards";
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import '../App.css';



import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "../components/utils";


import "react-credit-cards/es/styles-compiled.css";
import LoadingSpinner from '../components/LoadingSpinner';

export default function CardPayment() {

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [issuer, setIssuer] = useState("");
  const [focused, setFocused] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  
  const handleCallback = ({issuer}, isValid) => {
    if (isValid) {
      setIssuer(issuer)
    }
  }; 
  const handleInputFocus = ({ target }) => {
    setFocused(target.value)
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
      setCVC(target.value);
    }
    else if (target.name === "name") {
      setName(target.value);
    }
  };

  const payByCard = () => {
    setIsLoading(true);
    setTimeout(() => {
    navigate("/afterPayment");}, 2000);
  };
  
  
  return (
    <Sheet
      sx={{
        maxWidth: 400,
        mx: "auto", // margin left & right
        my: 4, // margin top & botom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <div>
          <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={handleCallback}
              />
          <Typography level="h4" component="h1">
            <b>Please Enter Your Card Details</b>
          </Typography>
          <Typography level="body2">Card Details</Typography>
      </div>
      
          <TextField
            // html input attribute
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
          />
      
      
      <TextField
        // html input attribute
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
      />
      <div className="row">
        <div className="col-6">
        <TextField
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
        />
        </div>
        <div className="col-6">
            <TextField
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
            />
        </div>
        <Button  variant="contained"
        sx={{
          mt: 2, // margin top
        }}
        onClick={() => payByCard()}>
        Confirm Details To Pay
      </Button>
      </div>
      <input type="hidden" name="issuer" value={issuer} />
      <div className={isLoading ? 'visible' : 'hidden'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography>Processing to Checkout...... </Typography>
        <LoadingSpinner/>
      </div>
      
    </Sheet>
  );
}



