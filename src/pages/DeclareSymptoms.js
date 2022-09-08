
import { BodyComponent } from "reactjs-human-body";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function DeclareSymptoms() {
  const [bodyState, setBodyState] = useState({
    head: {
      show: true,
      selected: false
    },
    left_shoulder: {
      show: true,
      selected: false
    },
    right_shoulder: {
      show: true,
      selected: false
    },
    left_arm: {
      show: true,
      selected: false
    },
    right_arm: {
      show: true,
      selected: false
    },
    chest: {
      show: true,
      selected: false
    },
    stomach: {
      show: true,
      selected: false
    },
    left_leg: {
      show: true,
      selected: false
    },
    right_leg: {
      show: true,
      selected: false
    },
    left_hand: {
      show: true,
      selected: false
    },
    right_hand: {
      show: true,
      selected: false
    },
    left_foot: {
      show: true,
      selected: false
    },
    right_foot: {
      show: true,
      selected: false
    }
  });

//   useState(() => {
//     window.alert(JSON.stringify(bodyState.head));
//   }, [bodyState]);

  return (
    <div className="DeclareSymptoms">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <BodyComponent partsInput={bodyState} />
        <Button variant="contained"  
            onClick={() => {
                window.alert(JSON.stringify("head selected :"+bodyState.head.selected))
            }}
          >
            Save
          </Button>
      </div>
    </div>
  );
}

