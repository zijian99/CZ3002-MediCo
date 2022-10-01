import { BodyComponent } from "reactjs-human-body";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ClassNames } from "../css/Symptom.css";
export default function DeclareSymptoms() {
  const [bodyState, setBodyState] = useState({
    head: {
      show: true,
      selected: false,
      name: "head",
    },

    right_shoulder: {
      show: true,
      selected: false,
      name: "right_shoulder",
    },
    left_shoulder: {
      show: true,
      selected: false,
      name: "left_shoulder",
    },

    right_arm: {
      show: true,
      selected: false,
      name: "right_arm",
    },
    left_arm: {
      show: true,
      selected: false,
      name: "left_arm",
    },
    chest: {
      show: true,
      selected: false,
      name: "chest",
    },
    stomach: {
      show: true,
      selected: false,
      name: "stomach",
    },

    right_leg: {
      show: true,
      selected: false,
      name: "right_leg",
    },
    left_leg: {
      show: true,
      selected: false,
      name: "left_leg",
    },

    right_hand: {
      show: true,
      selected: false,
      name: "right_hand",
    },
    left_hand: {
      show: true,
      selected: false,
      name: "left_hand",
    },

    right_foot: {
      show: true,
      selected: false,
      name: "right_foot",
    },
    left_foot: {
      show: true,
      selected: false,
      name: "left_foot",
    },
  });

  //   useState(() => {
  //     window.alert(JSON.stringify(bodyState.head));
  //   }, [bodyState]);
  
  const [pain, setPain] = useState(false);
  const togglePain = () => {
    // 👇️ passed function to setState
    setPain(current => !current);
  };

  const [numb, setNumb] = useState(false);
  const toggleNumb = () => {
    // 👇️ passed function to setState
    setNumb(current => !current);
  };
  
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
    setPain(current => !current);
    setNumb(current => !current);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
    togglePain();
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
    toggleNumb();
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Numb"
        control={<Checkbox checked={checked[1]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Pain"
        control={<Checkbox checked={checked[1]} onChange={handleChange3}  />}
      />
    </Box>
  );

  return (
    <div className="DeclareSymptoms">
      <h1>Hello Dear 'patient name'</h1>
      <h2> Please select your area of discomfort and click next!</h2>

      <div>
        <div className="float-container">
          <div class="float-child">
            <BodyComponent partsInput={bodyState} />
          </div>
          <div class="float-child">
            <FormControlLabel
              label="Both"
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
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  function selectedBodyParts() {
    var head =
      bodyState.head.selected === true ? " " + bodyState.head.name : "";
    var left_shoulder =
      bodyState.left_shoulder.selected === true
        ? " " + bodyState.left_shoulder.name
        : "";
    var right_shoulder =
      bodyState.right_shoulder.selected === true
        ? " " + bodyState.right_shoulder.name
        : "";
    var left_arm =
      bodyState.left_arm.selected === true
        ? " " + bodyState.left_arm.name
        : "";
    var right_arm =
      bodyState.right_arm.selected === true
        ? " " + bodyState.right_arm.name
        : "";
    var chest =
      bodyState.chest.selected === true ? " " + bodyState.chest.name : "";
    var left_hand =
      bodyState.left_hand.selected === true
        ? " " + bodyState.left_hand.name
        : "";
    var right_hand =
      bodyState.right_hand.selected === true
        ? " " + bodyState.right_hand.name
        : "";

    var left_leg =
      bodyState.left_leg.selected === true
        ? " " + bodyState.left_leg.name
        : "";
    var right_leg =
      bodyState.right_leg.selected === true
        ? " " + bodyState.right_leg.name
        : "";

    var left_foot =
      bodyState.left_foot.selected === true
        ? " " + bodyState.left_foot.name
        : "";
    var right_foot =
      bodyState.right_foot.selected === true
        ? " " + bodyState.right_foot.name
        : "";
    var stomach =
      bodyState.stomach.selected === true ? " " + bodyState.stomach.name : "";
    //Sympthom
    var painStatus =
      pain === true ? " Pain "  : "";
    
    var numbStatus =
      numb === true ? " Numb " : "";

    var patientCodition=    JSON.stringify(
        "you have selected body part(s): " +
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
        right_foot+
        " and have symptom(s) of "+
        painStatus+
        numbStatus
    );

    window.alert(
      patientCodition
    );


  }
}
