// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// could import database from firebase

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'ratem-482b2.firebaseapp.com',
  projectId: 'ratem-482b2',
  storageBucket: 'ratem-482b2.appspot.com',
  messagingSenderId: '824117516432',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: 'G-MD6VLBY91Z',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
// possible define database
