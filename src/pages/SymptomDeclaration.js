import React, { Component, useState} from "react";
import { render } from "react-dom";
import { Typography } from "@mui/material";
import CanvasDraw from "react-canvas-draw";
import classNames from "../css/SymptomDeclaration.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



class SymptomDeclaration extends Component {

    state = {
      show: true,
    }
  
    toggle = () => this.setState((currentState) => ({show: !currentState.show}));
  


  render() {
    return (
      
      <div  >
        
        <div>
        <Button variant="contained" onClick={this.toggle}>
          Full body: {this.state.show ? 'show' : 'hide'} 
        </Button>    
        {this.state.show && <div>Hi there welcome to 
     
        <h2>Symptom Declaration</h2>
 
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
             <a >Download</a>
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
          </div>}
        </div>

     




      </div>




    );
  }
}
export default SymptomDeclaration;
