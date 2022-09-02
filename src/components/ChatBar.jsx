import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

export default function ChatBar(props) {
  const [currentText, setCurrentText] = useState("");

  const handleChange = (event) => {
    setCurrentText((currentText) => event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter" && event.shiftKey) {
      return;
    } else if (event.key == "Enter") {
      handleSend();
      event.preventDefault();
    }
  };

  const handleSend = () => {
    if (currentText === "") {
      // Empty message
      return;
    }
    setCurrentText((current) => "");
    // Send to database:
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={8} sm={11}>
        <TextField
          multiline
          fullWidth={true}
          value={currentText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          variant="filled"
        />
      </Grid>
      <Grid item ml={2}>
        <Button variant="filled" onClick={handleSend}>
          SEND
        </Button>
      </Grid>
    </Grid>
  );
}
