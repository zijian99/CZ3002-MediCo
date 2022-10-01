import {auth, db} from "./firebase.js";
import { doc, addDoc, setDoc } from "firebase/firestore";

const createUserDoc = async(uid, data) => {
    await setDoc(doc(db, 'Users', uid), data);
}



export {createUserDoc};