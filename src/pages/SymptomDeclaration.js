import React, { Component } from "react";
import { render } from "react-dom";
import { Typography } from "@mui/material";
import CanvasDraw from "react-canvas-draw";
import classNames from "../css/SymptomDeclaration.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
class SymptomDeclaration extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
    backgroundImg:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
    imgs: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
      "https://i.imgur.com/a0CGGVC.jpg",
    ],
  };


  render() {
    return (
      <div>
        <h1>Symptom Declaration</h1>
        <p>Try it out! Draw something, hit "Save" and then "Load".</p>
        <div className={classNames.tools}>
        <Stack spacing={30} direction="row">
  

          <Button variant="contained"  
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </Button>
          <Button variant="contained"  onClick={() => {this.saveableCanvas.eraseAll();}}>Erase</Button>
          <Button variant="contained" 
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </Button>
          <Button variant="contained" 
            onClick={() => {
              console.log(this.saveableCanvas.getDataURL());
              alert("DataURL written to console");
            }}
          >
            GetDataURL
          </Button>
            <Button variant="contained" 
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              localStorage.getItem("savedDrawing")
            );
          }}
        >
          Load
        </Button>
        </Stack>
        </div>
        <div className='rowC'>
         
        <p>
        Patient
        </p>
        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushColor= "#ff0000"
          brushRadius={3}
          lazyRadius={3}
          canvasWidth={700}
          canvasHeight={600}
          imgSrc="https://images.ctfassets.net/oc83wx5cwffk/spu_wysiwyg_fid34970_asset/dbf7bc8e7b533ef3e1fb93866e2ba70d/Body_Graphic_for_Pain_Scale_2016.gif"
      
        /> 

        <p>
        Doctor 
        </p>
        <CanvasDraw
          disabled
          hideGrid
          ref={(canvasDraw) => (this.loadableCanvas = canvasDraw)}
          canvasWidth={700}
          canvasHeight={600}
          saveData={localStorage.getItem("savedDrawing")}
          imgSrc="https://images.ctfassets.net/oc83wx5cwffk/spu_wysiwyg_fid34970_asset/dbf7bc8e7b533ef3e1fb93866e2ba70d/Body_Graphic_for_Pain_Scale_2016.gif"
        />
          </div>
       
      </div>
    );
  }
}
export default SymptomDeclaration;
