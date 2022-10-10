import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';



const createChatHistory = async (
	docRef,
	timestamp,
	sender,
	msg,
) => {
	/* create new chat history document to store chat msg */
	/* 1 msg per document */
	const cRef = collection(docRef, 'ChatHistory');
	await addDoc(cRef, {
		from: sender,
		timestamp: timestamp,
		msg: msg,
	});
};

export default function ChatBar(props) {
	const [inputText, setInputText] = useState('');
	const sendHandler = () => {
		createChatHistory(props.docRef, serverTimestamp(), 'Doctor', inputText);
		setInputText((prev) => ' ');
		console.log('Sent!');
	};
	return (
		<div className='chatBarContainer'>
			<input
				type='text'
				placeholder=''
				onChange={(e) => setInputText((prev) => e.target.value)}
				onKeyDown={(e) => {
					e.key === 'Enter' && sendHandler();
				}}
			/>
			<button onClick={sendHandler}>Send</button>
		</div>
	);
}
