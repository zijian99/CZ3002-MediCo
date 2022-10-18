# MediCo
Copyright © 2022 MediCo (Group 1)

![logo_transparent_cropped](https://user-images.githubusercontent.com/76023265/196356338-4a0ba752-8ebf-4eb3-adf1-1ee7d96719e6.png)

**Note: The application backend will not be functional without connecting a Firebase application in "src/firebase.js". Please add your own Firebase application if you wish to test the app.

# Introduction

MediCo is a remote medical consultation service which can be hosted online. The application allows users to register and login, after which they can consult a medical professional about their ailments via live chat as well as through a body diagram. Users can also search for the nearest GP clinic by using their location or inputting their postal code.

Note that MediCo is not intended as a complete substitute to seeing a doctor physically; it is intended for low-severity sicknesses which do not dictate a need for physical consultation. This also has the added benefit of reducing health risks as clinics can be hotspots of disease transmission. Users should do a physical consultation if medical professionals on MediCo advises so.

# Features

## Register / Login

The user can create accounts and log in via the Register and Login pages; creation of accounts are updated in Firebase Authentication. Registration also checks for duplicates / illegal inputs (password mismatch, etc.) before allowing accounts to be created. 

## Authentication

Users can only see pages such as Doctor Chat and Symptom Declaration after authenticating via email and password login. Attempts to access these webpages will be denied if they are not logged in via conditional rendering based on the authentication status.

## Doctor Chat

Doctor Chat is implemented via a live observer into a specific ChatHistory collection in Firestore; any new messages sent will update the ChatHistory collection backend, which in turn updates the frontend display of the chat window. The chat bar also features a voice-to-text feature via the microphone button, which can detect spoken language (English) and populate the chat bar accordingly.

## Symptom Declaration

Users can declare and pinpoint their symptoms and areas of pain via point-and-click actions on interactive diagram. These symptom data are sent to the backend Symptom Declaration collection for review by the doctor.
