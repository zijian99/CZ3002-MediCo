import React, { Component, useState } from "react";
import { render } from "react-dom";
import { Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CanvasDraw from "react-canvas-draw";
import classNames from "../css/SymptomDeclaration.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class Symptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headDiv: false,
      chestDiv: false,
      upperLimbDiv: false,
      lowerLimbDiv: false,
      fullBodyDivL: false,
    };
  }

  showHead = () => {
    this.setState({
      headDiv: true,
    });
  };
  hideHead = () => {
    this.setState({
      headDiv: false,
    });
  };
  showChest = () => {
    this.setState({
      chestDiv: true,
    });
  };
  hideChest = () => {
    this.setState({
      chestDiv: false,
    });
  };
  showupperLimbDiv = () => {
    this.setState({
      upperLimbDiv: true,
    });
  };
  hideupperLimbDiv = () => {
    this.setState({
      upperLimbDiv: false,
    });
  };

  showlowerLimbDiv = () => {
    this.setState({
      lowerLimbDiv: true,
    });
  };
  hidelowerLimbDiv = () => {
    this.setState({
      lowerLimbDiv: false,
    });
  };
  showfullBodyDivL = () => {
    this.setState({
      fullBodyDivL: true,
    });
  };
  hidefullBodyDivL = () => {
    this.setState({
      fullBodyDivL: false,
    });
  };

  render() {
    return (
      <div>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={3}>
                <Item onClick={this.showHead}> Head</Item>
              </Grid>
              <Grid item xs={3}>
                <Item onClick={this.showChest}>Chest</Item>
              </Grid>
              <Grid item xs={3}>
                <Item onClick={this.showlowerLimbDiv}>Lower Limb</Item>
              </Grid>
              <Grid item xs={3}>
                <Item onClick={this.showupperLimbDiv}>Upper Limb</Item>
              </Grid>
              <Grid item xs={3}>
                <Item onClick={this.showfullBodyDivL}>Full Body</Item>
              </Grid>
            </Grid>
          </Box>
        </div>

        <Stack>
          <div id="headDiv" hidden={!this.state.headDiv}>
            <h1>Head Area</h1>
            <div className={classNames.tools}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("savedhead", this.head.getSaveData());
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.head.eraseAll();
                  }}
                >
                  Erase
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.head.undo();
                  }}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(this.head.getDataURL());
                    alert("DataURL written to console");
                  }}
                >
                  <a>Download</a>
                </Button>

                <Button variant="contained" onClick={this.hideHead}>
                  Hide Head
                </Button>
              </Stack>
            </div>
            <div className="rowC">
              <CanvasDraw
                ref={(canvasDraw) => (this.head = canvasDraw)}
                brushColor="#ff0000"
                brushRadius={3}
                lazyRadius={3}
                canvasWidth={1650}
                canvasHeight={400}
                imgSrc="https://t3.ftcdn.net/jpg/04/36/90/16/360_F_436901678_gPFyYlmTrCJWExu88453HURJpC9mFHcl.jpg"
              />
            </div>
          </div>

          <div id="chestDiv" hidden={!this.state.chestDiv}>
            <h1>Chest Area</h1>
            <div className={classNames.tools}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem(
                      "savedchest",
                      this.chest.getSaveData()
                    );
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.chest.eraseAll();
                  }}
                >
                  Erase
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.chest.undo();
                  }}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(this.chest.getDataURL());
                    alert("DataURL written to console");
                  }}
                >
                  <a>Download</a>
                </Button>

                <Button variant="contained" onClick={this.hideChest}>
                  Hide Chest
                </Button>
              </Stack>
            </div>
            <div className="rowC">
              <CanvasDraw
                ref={(canvasDraw) => (this.chest = canvasDraw)}
                brushColor="#ff0000"
                brushRadius={3}
                lazyRadius={3}
                canvasWidth={700}
                canvasHeight={600}
                imgSrc="https://image.shutterstock.com/image-illustration/muscular-male-chest-linear-icon-260nw-763435237.jpg"
              />
            </div>
          </div>

          <div id="lowerLimbDiv" hidden={!this.state.lowerLimbDiv}>
            <h1>Lower Limb Area</h1>
            <div className={classNames.tools}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem(
                      "savedlowerlimb",
                      this.lowerlimb.getSaveData()
                    );
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.lowerlimb.eraseAll();
                  }}
                >
                  Erase
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.lowerlimb.undo();
                  }}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(this.lowerlimb.getDataURL());
                    alert("DataURL written to console");
                  }}
                >
                  <a>Download</a>
                </Button>

                <Button variant="contained" onClick={this.hidelowerLimbDiv}>
                  Hide Lower Limb
                </Button>
              </Stack>
            </div>
            <div className="rowC">
              <CanvasDraw
                ref={(canvasDraw) => (this.lowerlimb = canvasDraw)}
                brushColor="#ff0000"
                brushRadius={3}
                lazyRadius={3}
                canvasWidth={650}
                canvasHeight={800}
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6D7Xw_HgLWWSml2teABMp8woSZKc1BXr6pg&usqp=CAU"
              />
            </div>
          </div>

          <div id="upperlimbDiv" hidden={!this.state.upperLimbDiv}>
            <h1>Upper Limb Area</h1>
            <div className={classNames.tools}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem(
                      "savedupperlimb",
                      this.upperlimb.getSaveData()
                    );
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.upperlimb.eraseAll();
                  }}
                >
                  Erase
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.upperlimb.undo();
                  }}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(this.upperlimb.getDataURL());
                    alert("DataURL written to console");
                  }}
                >
                  <a>Download</a>
                </Button>

                <Button variant="contained" onClick={this.hideupperLimbDiv}>
                  Hide Upper Limb
                </Button>
              </Stack>
            </div>
            <div className="rowC">
              <CanvasDraw
                ref={(canvasDraw) => (this.upperlimb = canvasDraw)}
                brushColor="#ff0000"
                brushRadius={3}
                lazyRadius={3}
                canvasWidth={500}
                canvasHeight={700}
                imgSrc="https://i0.wp.com/clinicalgate.com/wp-content/uploads/2015/03/B9780443066849500536_gr15.jpg?fit=401%2C574&ssl=1"
              />
            </div>
          </div>

          <div id="fullbodyDiv" hidden={!this.state.fullBodyDivL}>
            <div className={classNames.tools}>
              <Stack spacing={3} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem(
                      "savedfullbody",
                      this.fullbody.getSaveData()
                    );
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.fullbody.eraseAll();
                  }}
                >
                  Erase
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.fullbody.undo();
                  }}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(this.fullbody.getDataURL());
                    alert("DataURL written to console");
                  }}
                >
                  <a>Download</a>
                </Button>

                <Button variant="contained" onClick={this.hidefullBodyDivL}>
                  Hide Fullbody
                </Button>
              </Stack>
            </div>
            <div className="rowC">
              <CanvasDraw
                ref={(canvasDraw) => (this.fullbody = canvasDraw)}
                brushColor="#ff0000"
                brushRadius={3}
                lazyRadius={3}
                canvasWidth={700}
                canvasHeight={600}
                imgSrc="https://images.ctfassets.net/oc83wx5cwffk/spu_wysiwyg_fid34970_asset/dbf7bc8e7b533ef3e1fb93866e2ba70d/Body_Graphic_for_Pain_Scale_2016.gif"
              />
            </div>
          </div>
        </Stack>
      </div>
    );
  }
}
export default Symptom;
