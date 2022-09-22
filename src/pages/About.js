
import { useEffect, useState } from "react";
import { Accordion , AccordionDetails , AccordionSummary ,Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import logo from '../assets/AboutUsHeader.png';

const teamNames = [
	"Min Kabar Kyaw",
	"Chua Zi Jian",
	"Ma Guangheng",
	"Yu Xinhui",
	"Zou Zeren",
	"Su Myat Aung",
	"Huang Qi Yuan",
];

const text = "MediCo is a web application that connects patients and healthcare providers remotely for day-to-day medical consultations. Patients can go to MediCo's website to report their current symptoms and problems, and they will be matched with a doctor who will advise them on the next step to take for treatment/recovery as well as providing medical certificates. MediCo also provides user-friendly features to cater to users of different demographics and improve their user experience.";

export default function About() {
	
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
	  setExpanded(isExpanded ? panel : false);
	};

	const [size, setSize] = useState({x: window.innerWidth, y: window.innerHeight});
	
	const updateSize = () =>setSize({
		  x: window.innerWidth,
		  y: window.innerHeight
		});

	useEffect(() => (window.onresize = updateSize), []);

	return (
		<div>
			<img src={logo} 
             alt={'logo'}
			 width={size.x}
			 >

			 </img>
		  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel1bh-content"
			  id="panel1bh-header"
			>
			  <Typography sx={{ width: '33%', flexShrink: 0}}>
				About MediCo
			  </Typography>
			</AccordionSummary>
			<AccordionDetails>
			  <Typography variant="h7">
				{text}
			  </Typography>
			</AccordionDetails>
		  </Accordion>

		  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel2bh-content"
			  id="panel2bh-header"
			>
			  <Typography sx={{ width: '33%', flexShrink: 0 }}>About the Team</Typography>
			</AccordionSummary>
			<AccordionDetails>
			{teamNames.map((personName) => (
			<Typography key={personName} variant='h7' display='block' align='left'>
				{personName}
			</Typography>))}
			</AccordionDetails>
		  </Accordion>
		</div>
	  );
}