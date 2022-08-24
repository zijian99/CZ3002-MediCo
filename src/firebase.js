// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyBeS398Z97E-CaOoOUZO3uez80Hzht4pW0",

	authDomain: "medico-f0bc7.firebaseapp.com",

	projectId: "medico-f0bc7",

	storageBucket: "medico-f0bc7.appspot.com",

	messagingSenderId: "757509226515",

	appId: "1:757509226515:web:a36e8494f2f8ecf6dc3fe6",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
setPersistence(auth, browserSessionPersistence)
	.then(() => {})
	.catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
	});

export { db, auth };
