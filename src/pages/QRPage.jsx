import React, { useState } from "react";
import { Grid, CircularProgress, Button, IconButton,Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import qrcode from "../assets/qrcode_example.jpeg"
const preventDefault = (event) => event.preventDefault();

export default function QRPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    function navigateEndPayment() {
      setIsLoading(true);
      setTimeout(() => {
      navigate('/afterPayment');}, 2000);
    }

	return(
            <div>
              <div>
                
                <Typography sx={{fontWeight: 'regular'}} variant="h6">Please Scan to Pay Your Medication Fees</Typography>
                <br></br>
                <br></br>
                <b>Total: SGD$200</b>
                <br></br>
                <br></br>
                <img src={qrcode} height={300} width={300}></img>
                <br></br>
                <Button variant="outlined" onClick={navigateEndPayment}>Payment Done</Button>
                <br/>
                <div className={isLoading ? 'visible' : 'hidden'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography>Processing to Checkout...... </Typography>
                    <LoadingSpinner/>
                </div>
              </div>
            </div>
    );
}