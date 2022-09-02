import React from "react"
import { TextField, Button } from "mui/material"

export default function ChatBar(props){
	const [currentText, setCurrentText] = useState("");

	const handleChange = (event) => {
		setCurrentText((currentText) => event.target.value);
	}

	const handleKeyDown = (event) =>{
		if (event.key == "Enter" && event.shiftKey) {
		  return;
		} else if (event.key == "Enter") {
		  handleSend();
		  event.preventDefault();
		}	
	}

	const handleSend = () =>{
		if(currentText === ""){ // Empty message
			return;
		}
		// Send to database:
	}

	return (
		<Grid container>
			<Grid item>
				<TextField multiline value={currentText} onChange={handleChange} onKeyDown={handleKeyDown} variant='filled'/>
			</Grid>
			<Grid item>
				<Button variant='filled'>SEND</Button>
			</Grid>
		</Grid>
	);
}
