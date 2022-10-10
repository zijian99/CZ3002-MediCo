import React, { useEffect, useState } from 'react';
import '../App.css';
import DocChatBar from '../components/DocChatBar.jsx';
import DocChatWindow from '../components/DocChatWindow';
import PathDisplay from '../components/PathDisplay';
import { getDisplayName } from '../firestore functions';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
	DocumentReference,
} from 'firebase/firestore';
import { db } from '../firebase';

export default function DoctorSideChat() {
	const [refPath, setRefPath] = useState(
		'Users/Y0wdXpIeSTR9mBN6b5v22WUkF4o2/ConsultHistory/'
	);
	const [docRef, setDocRef] = useState();
	// const [patientID,setPatientID]=useState('Y0wdXpIeSTR9mBN6b5v22WUkF4o2');
	// const [patientName,setPatientName]=useState('');

	useEffect(() => {
		const consultHistoryRef = collection(db, refPath);
		const latestDocQ = query(   consultHistoryRef,   orderBy('timestamp', 'desc'),   limit(1)
		);

		const callFirebase = async () => {
			const latestDocSnapshot = await getDocs(latestDocQ);
			latestDocSnapshot.forEach((doc) => {
				const latestDocRef = doc.ref;
				console.log(latestDocRef);
				console.log(doc.data().type);
				setDocRef((prev) => latestDocRef);

			});
		};
		callFirebase();
	}, [refPath]);

	return (
		<div className='appContainer'>
			<PathDisplay path={refPath} setPath={setRefPath} />
			<DocChatWindow docRef={docRef} />
			<DocChatBar docRef={docRef} />
		</div>
	);
}