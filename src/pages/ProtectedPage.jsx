import React, { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedPage(props) {
    useEffect(() => {
        //Set up observer on user authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log("Authorization granted.");
                props.setLoggedIn(true);
            } else {
                // User is signed out
                console.log("Not authorized.");
                props.setLoggedIn(false);
            }
        });
    });
    return props.loggedIn ? (
        <div>
            <h1>Protected content</h1>
        </div>
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
}
