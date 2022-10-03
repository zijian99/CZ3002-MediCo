import { BodyComponent } from 'reactjs-human-body';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ClassNames } from '../css/Symptom.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createConsultHistory2 } from '../firestore functions';
import { serverTimestamp } from 'firebase/firestore';

export default function SymptomDeclaration() {
    const uid = '';
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in

            uid = user.uid;
            console.log('Authorization granted to ' + uid);
        } else {
            // User is signed out
            console.log('Not authorized.');
        }
    });

    const navigate = useNavigate();
    const [bodyState] = useState({
        head: {
            show: true,
            selected: false,
            name: 'head',
        },

        right_shoulder: {
            show: true,
            selected: false,
            name: 'right_shoulder',
        },
        left_shoulder: {
            show: true,
            selected: false,
            name: 'left_shoulder',
        },

        right_arm: {
            show: true,
            selected: false,
            name: 'right_arm',
        },
        left_arm: {
            show: true,
            selected: false,
            name: 'left_arm',
        },
        chest: {
            show: true,
            selected: false,
            name: 'chest',
        },
        stomach: {
            show: true,
            selected: false,
            name: 'stomach',
        },

        right_leg: {
            show: true,
            selected: false,
            name: 'right_leg',
        },
        left_leg: {
            show: true,
            selected: false,
            name: 'left_leg',
        },

        right_hand: {
            show: true,
            selected: false,
            name: 'right_hand',
        },
        left_hand: {
            show: true,
            selected: false,
            name: 'left_hand',
        },

        right_foot: {
            show: true,
            selected: false,
            name: 'right_foot',
        },
        left_foot: {
            show: true,
            selected: false,
            name: 'left_foot',
        },
    });

    //   useState(() => {
    //     window.alert(JSON.stringify(bodyState.head));
    //   }, [bodyState]);

    const [pain, setPain] = useState(false);
    const [numb, setNumb] = useState(false);
    const [Pressure, setPressure] = useState(false);
    const [Burning, setBurning] = useState(false);
    const [Tightness, setTightness] = useState(false);
    const [Fatigue, setFatigue] = useState(false);
    const [Trembling, setTrembling] = useState(false);
    const [Tension, setTension] = useState(false);
    const [checked, setChecked] = React.useState([true, false]);

    const togglePain = () => {
        // 👇️ passed function to setState
        setPain((current) => !current);
    };

    const toggleNumb = () => {
        // 👇️ passed function to setState
        setNumb((current) => !current);
    };

    const togglePressure = () => {
        // 👇️ passed function to setState
        setPressure((current) => !current);
    };

    const toggleBurning = () => {
        // 👇️ passed function to setState
        setBurning((current) => !current);
    };

    const toggleTightness = () => {
        // 👇️ passed function to setState
        setTightness((current) => !current);
    };

    const toggleFatigue = () => {
        // 👇️ passed function to setState
        setFatigue((current) => !current);
    };

    const toggleTrembling = () => {
        // 👇️ passed function to setState
        setTrembling((current) => !current);
    };

    const toggleTension = () => {
        // 👇️ passed function to setState
        setTension((current) => !current);
    };

    // const handleChangeAll = (event) => {
    //     setChecked([event.target.checked, event.target.checked]);
    // };

    const handleChangePain = (event) => {
        setChecked([event.target.checked]);
        togglePain();
    };

    const handleChangeNumb = (event) => {
        setChecked([checked[0], event.target.checked]);
        toggleNumb();
    };
    const handleChangePressure = (event) => {
        setChecked([checked[0], checked[0], event.target.checked]);
        togglePressure();
    };

    const handleChangeBurning = (event) => {
        setChecked([checked[0], checked[0], checked[0], event.target.checked]);
        toggleBurning();
    };
    const handleChangeTightness = (event) => {
        setChecked([
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            event.target.checked,
        ]);
        toggleTightness();
    };

    const handleChangeFatigue = (event) => {
        setChecked([
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            event.target.checked,
        ]);
        toggleFatigue();
    };
    const handleChangeTrembling = (event) => {
        setChecked([
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            event.target.checked,
        ]);
        toggleTrembling();
    };

    const handleChangeTension = (event) => {
        setChecked([
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            checked[0],
            event.target.checked,
        ]);
        toggleTension();
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label='Pain'
                control={
                    <Checkbox
                        checked={checked[0]}
                        onChange={handleChangePain}
                    />
                }
            />
            <FormControlLabel
                label='Numb'
                control={
                    <Checkbox
                        checked={checked[1]}
                        onChange={handleChangeNumb}
                    />
                }
            />
            <FormControlLabel
                label='Pressure'
                control={
                    <Checkbox
                        checked={checked[2]}
                        onChange={handleChangePressure}
                    />
                }
            />

            <FormControlLabel
                label='Burning'
                control={
                    <Checkbox
                        checked={checked[3]}
                        onChange={handleChangeBurning}
                    />
                }
            />
            <FormControlLabel
                label='Tightness'
                control={
                    <Checkbox
                        checked={checked[4]}
                        onChange={handleChangeTightness}
                    />
                }
            />
            <FormControlLabel
                label='Fatigue'
                control={
                    <Checkbox
                        checked={checked[5]}
                        onChange={handleChangeFatigue}
                    />
                }
            />
            <FormControlLabel
                label='Trembling'
                control={
                    <Checkbox
                        checked={checked[6]}
                        onChange={handleChangeTrembling}
                    />
                }
            />
            <FormControlLabel
                label='Tension'
                control={
                    <Checkbox
                        checked={checked[7]}
                        onChange={handleChangeTension}
                    />
                }
            />
        </Box>
    );

    function selectedBodyParts() {
        var head =
            bodyState.head.selected === true
                ? ' ' + bodyState.head.name + '; '
                : '';
        var left_shoulder =
            bodyState.left_shoulder.selected === true
                ? ' ' + bodyState.left_shoulder.name + '; '
                : '';
        var right_shoulder =
            bodyState.right_shoulder.selected === true
                ? ' ' + bodyState.right_shoulder.name + '; '
                : '';
        var left_arm =
            bodyState.left_arm.selected === true
                ? ' ' + bodyState.left_arm.name + '; '
                : '';
        var right_arm =
            bodyState.right_arm.selected === true
                ? ' ' + bodyState.right_arm.name + '; '
                : '';
        var chest =
            bodyState.chest.selected === true
                ? ' ' + bodyState.chest.name + '; '
                : '';
        var left_hand =
            bodyState.left_hand.selected === true
                ? ' ' + bodyState.left_hand.name + '; '
                : '';
        var right_hand =
            bodyState.right_hand.selected === true
                ? ' ' + bodyState.right_hand.name + '; '
                : '';

        var left_leg =
            bodyState.left_leg.selected === true
                ? ' ' + bodyState.left_leg.name + '; '
                : '';
        var right_leg =
            bodyState.right_leg.selected === true
                ? ' ' + bodyState.right_leg.name + '; '
                : '';

        var left_foot =
            bodyState.left_foot.selected === true
                ? ' ' + bodyState.left_foot.name + '; '
                : '';
        var right_foot =
            bodyState.right_foot.selected === true
                ? ' ' + bodyState.right_foot.name + '; '
                : '';
        var stomach =
            bodyState.stomach.selected === true
                ? ' ' + bodyState.stomach.name + '; '
                : '';
        //Sympthom
        var painStatus = pain === true ? ' Pain ' + '; ' : '';

        var numbStatus = numb === true ? ' Numb ' + '; ' : '';

        var PressureStatus = Pressure === true ? ' Pressure;' : '';
        var BurningStatus = Burning === true ? ' Burning;' : '';
        var TightnessStatus = Tightness === true ? ' Tightness;' : '';
        var FatigueStatus = Fatigue === true ? ' Fatigue;' : '';
        var TremblingStatus = Trembling === true ? ' Trembling;' : '';
        var TensionStatus = Tension === true ? ' Tension;' : '';

        var patientCodition = JSON.stringify(
            'you have selected body part(s): ' +
                head +
                left_shoulder +
                right_shoulder +
                left_arm +
                right_arm +
                stomach +
                chest +
                left_hand +
                right_hand +
                left_leg +
                right_leg +
                left_foot +
                right_foot +
                ' and have symptom(s) of ' +
                painStatus +
                numbStatus +
                PressureStatus +
                BurningStatus +
                TightnessStatus +
                FatigueStatus +
                TremblingStatus +
                TensionStatus
        );
        /* --------------Add to database----------------*/
        /*--------------where can I find the userid?---------*/

        createConsultHistory2(uid, serverTimestamp(), patientCodition);
        window.alert(patientCodition);

        navigate('/doctorchat');
    }

    return (
        <div className='DeclareSymptoms'>
            <h1>Hello Dear {uid}</h1>
            <h2> Please select your area of discomfort and click next!</h2>

            <div>
                <div className='float-container'>
                    <div class='float-child'>
                        <BodyComponent partsInput={bodyState} />
                    </div>
                    <div class='float-child'>
                        {/* <FormControlLabel
                            label='Parent'
                            control={
                                <Checkbox
                                    checked={checked[0] && checked[1]}
                                    indeterminate={checked[0] !== checked[1]}
                                    onChange={handleChangeAll}
                                />
                            }
                        /> */}
                        {children}

                        <Button
                            variant='contained'
                            onClick={() => {
                                selectedBodyParts();
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
