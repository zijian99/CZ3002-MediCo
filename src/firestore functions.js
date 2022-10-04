// added "type": "module" to package.json to avoid error: cannot use import statement outside a module
// import above functions from this file if needed


import { auth, db } from './firebase.js';
import {
    doc,
    addDoc,
    setDoc,
    collection,
    CollectionReference,
    getDoc,
    DocumentReference,
} from 'firebase/firestore';

const createUserDoc = async (uid, data) => {

    /* create new user document upon registration */
    await setDoc(doc(db, 'Users', uid), data);
};

const createConsultHistory1 = async (uid, docId, timestamp) => {
    /* creates a ConsultHistory document for patient and doctor respectively, returns the docReference */
    const dCRef = collection(db, 'Doctors/' + docId + '/ConsultHistory');
    const uCRef = collection(db, 'Users/' + uid + '/ConsultHistory');
    const uDocRef = await addDoc(uCRef, {
        docId: docId,
        timestamp: timestamp,
        type: 'chat with doc',
    });
    const dDocRef = await addDoc(dCRef, {
        ref: uDocRef,
        patientId: uid,
        timestamp: timestamp,
        type: 'chat with doc',
    });
    await setDoc(uDocRef, { ref: dDocRef }, { merge: true });
    console.log('uDocRef in createConsultHistory1: ', uDocRef);
    console.log('dDocRef in createConsultHistory1: ', dDocRef);
    return { uDocRef, dDocRef };
};

const createConsultHistory2 = async (uid, timestamp, data) => {
    /* creates a ConsultHistory document for symptom declaration */
    const uCRef = collection(db, 'Users/' + uid + '/ConsultHistory');
    const uDocRef = await addDoc(uCRef, {
        timestamp: timestamp,
        type: 'symptom declaration',
        symptoms: data,
    });
    return uDocRef;
};


const createChatHistory = async (uDocRef, dDocRef, timestamp, sender, msg) => {
    /* create new chat history document to store chat msg */
    /* 1 msg per document */
    const dCRef = collection(dDocRef, 'ChatHistory');
    const uCRef = collection(uDocRef, 'ChatHistory');
    await addDoc(uCRef, {
        from: sender,
        timestamp: timestamp,
        msg: msg,
    });
    await addDoc(dCRef, {
        from: sender,
        timestamp: timestamp,
        msg: msg,
    });
};

const getDisplayName = async (uid) => {
    /* get display name of user */
    const docRef = doc(db, 'Users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().username;
    } else {
        console.log('No such document!');
        return null;
    }
};

export {
    createUserDoc,
    createConsultHistory1,
    createConsultHistory2,
    createChatHistory,
    getDisplayName,
};

