import React from "react";
import { CardActionArea, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import logo from '../assets/symptom_declaration_image.jpg';

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
	
	return (
	<Card sx={{ maxWidth: 350 }}>
      <CardContent>
	  <Typography variant="h5">
          About MediCo
        </Typography>
        <img src={logo} 
             alt={'logo'}/>
        <Typography variant="body2">
          {text}
        </Typography>
      </CardContent>
	  <br/>
	  <br/>

	  <CardActionArea
	  	onClick={teamNames.map((personName) => (
		<Typography variant='h5' display='block' align='center'>
			{personName}
		</Typography>))}
		>
	  <CardContent>
	  <Typography variant="h5">
          About The Members
        </Typography>
      </CardContent>
	  <CardMedia
          component="img"
          image={logo}
          alt="logo"
        />
		</CardActionArea>
    </Card>

		/*<div className="pageContainer" 
			sx={{
				display: "block",
				marginTop: 120,
				justifyContent: "center",
				alignItems: "center"}}>
			<Typography
				variant='h3'
				display='block'
				align='center'
				sx={{ mt: 10, mb: 5 }}
			>
				About the Team
			</Typography>
			{teamNames.map((personName) => (
				<Typography variant='h5' display='block' align='center'>
					{personName}
				</Typography>
			))}

			<Typography
			variant='h3'
			display='block'
			align='center'
			sx={{ mt: 10, mb: 5 }}>
				About MediCo
			</Typography>
			<Typography  display='block' align='left'>
				{text}
			</Typography>
		</div>*/
	);
}