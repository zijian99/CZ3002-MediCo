import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
	onSnapshot,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
	DocumentReference,
} from 'firebase/firestore';
import ChatBubble from '../components/ChatBubble';
import { db } from '../firebase';
import '../App.css';



export default function ChatWindow(props) {
	const [virtualList, setVirtualList] = useState([]);
	const virtuoso = useRef(null);

	useEffect(() => {
		const callFirebase = async () => {
			const q = query(
				collection(props.docRef, 'ChatHistory'),
				orderBy('timestamp')
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				console.log('Received message list change!');
				const chat_history= [];
				querySnapshot.forEach((chat_doc) => {
					chat_history.push({
						name: chat_doc.data().from,
						message: chat_doc.data().msg,
					});
				});
				setVirtualList(chat_history.map((item) => item));
			});
		};
		callFirebase();
	}, [props.docRef]);

	return (
		<div className='chatWindowContainer'>
			{virtualList.map((item) => (
				<ChatBubble
					userName={item.name}
					type={item.name === 'Doctor' ? 'sent' : 'received'}
					message={item.message}
				/>
			))}
		</div>
	);
}
