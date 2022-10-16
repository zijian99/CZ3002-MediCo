import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectionCard from '../components/SelectionCard';
import credit_card_image from '../assets/credit_card.jpg';
import qrcode_image from '../assets/scanpay.jpg';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Fade, Zoom } from '@mui/material';
const preventDefault = (event) => event.preventDefault();

export default function Payment(props) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const onClickHandler = (event) => {
        console.log('Clicked!');
        if (event == 0) {
            navigate('/cardPayment');
        }
        if (event == 1) {
            navigate('/qrcodepayment');
        }
    };
    return (
        <div>
            <div>
                <Fade in={true} timeout={2000}>
                    <Grid
                        container
                        alignItems='center'
                        justifyContent='center'
                        //marginTop='10vh'
                    >
                        <Grid
                            item
                            alignItems='center'
                            justifyContent='center'
                            mb={3}
                        >
                            <Typography
                                sx={{ fontWeight: 'bold' }}
                                variant='h3'
                                marginTop='10vh'
                            >
                                Please Choose A Payment Method
                            </Typography>
                        </Grid>
                    </Grid>
                </Fade>
                <br></br>
                <br></br>

                <Zoom in={true} timeout={1000}>
                    <Grid
                        container
                        xs={12}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Grid item mr={5}>
                            <SelectionCard
                                image={credit_card_image}
                                title='Credit/Debit Card Payment Method'
                                subtitle='Pay consultation and medication fee using cards.'
                                onClick={() => {
                                    onClickHandler(0);
                                }}
                            />
                        </Grid>
                        <Grid item ml={5}>
                            <SelectionCard
                                image={qrcode_image}
                                title='QRCode Payment'
                                subtitle='Pay using Paylah/Paynow/NETS.'
                                onClick={() => {
                                    onClickHandler(1);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Zoom>
            </div>
        </div>
    );
}
