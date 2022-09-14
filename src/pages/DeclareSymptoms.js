
import { BodyComponent } from "reactjs-human-body";
import React,{ useEffect, useState } from "react";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ClassNames } from "../css/Symptom.css";
export default function DeclareSymptoms() {
  const [bodyState, setBodyState] = useState({
    head: {
      show: true,
      selected: false,
      name:"head"
    },
    left_shoulder: {
      show: true,
      selected: false,
      name:"left_shoulder"
    },
    right_shoulder: {
      show: true,
      selected: false,
      name:"right_shoulder"
    },
    left_arm: {
      show: true,
      selected: false,
      name:"left_arm"
    },
    right_arm: {
      show: true,
      selected: false,
      name:"right_arm"
    },
    chest: {
      show: true,
      selected: false,
      name:"chest"
    },
    stomach: {
      show: true,
      selected: false,
      name:"stomach"
    },
    left_leg: {
      show: true,
      selected: false,
      name:"left_leg"
    },
    right_leg: {
      show: true,
      selected: false,
      name:"right_leg"
    },
    left_hand: {
      show: true,
      selected: false,
      name:"left_hand"
    },
    right_hand: {
      show: true,
      selected: false,
      name:"right_hand"
    },
    left_foot: {
      show: true,
      selected: false,
      name:"left_foot"
    },
    right_foot: {
      show: true,
      selected: false,
      name:"right_foot"
    }
  });

//   useState(() => {
//     window.alert(JSON.stringify(bodyState.head));
//   }, [bodyState]);

const [checked, setChecked] = React.useState([true, false]);

const handleChange1 = (event) => {
  setChecked([event.target.checked, event.target.checked]);
};

const handleChange2 = (event) => {
  setChecked([event.target.checked, checked[1]]);
};

const handleChange3 = (event) => {
  setChecked([checked[0], event.target.checked]);
};

const children = (
  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    <FormControlLabel
      label="Child 1"
      control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    />
    <FormControlLabel
      label="Child 2"
      control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    />
  </Box>
);

  return (
    <div className="DeclareSymptoms">
      <h1>Hello Dear 'patient name'</h1>
      <h2> Please select your area of discomfort and click next!</h2>

      <div>
      <div className='float-container'>
      <div class="float-child">
      <BodyComponent partsInput={bodyState} />
  </div> 
  <div class="float-child">
    
        <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
      <Button
          variant="contained"
          onClick={() => {
            selectedBodyParts();
          }}>
          Next
        </Button>
  </div>

        </div>
     

        
      </div>
    </div>
  );

  function selectedBodyParts() {
    var head = bodyState.head.selected === true ? ", " + bodyState.head.name : '';
    var left_shoulder = bodyState.left_shoulder.selected === true ? ", " + bodyState.left_shoulder.name : '';
    var right_shoulder = bodyState.right_shoulder.selected === true ? ", " + bodyState.right_shoulder.name : '';
    var left_arm = bodyState.left_arm.selected === true ? ", " + bodyState.left_arm.name : '';
    var right_arm = bodyState.right_arm.selected === true ? ", " + bodyState.right_arm.name : '';
    var chest = bodyState.chest.selected === true ? ", " + bodyState.chest.name : '';
    var left_hand = bodyState.left_hand.selected === true ? ", " + bodyState.left_hand.name : '';
    var right_hand = bodyState.right_hand.selected === true ? ", " + bodyState.right_hand.name : '';
    var left_foot = bodyState.left_foot.selected === true ? ", " + bodyState.left_foot.name : '';
    var right_foot = bodyState.right_foot.selected === true ? ", " + bodyState.right_foot.name : '';
    var stomach = bodyState.stomach.selected === true ? ", " + bodyState.stomach.name : '';

    window.alert(JSON.stringify("you have selected " + head + left_shoulder + right_shoulder + left_arm + right_arm + stomach + chest + left_hand + right_hand + left_foot + right_foot));
  }
}

