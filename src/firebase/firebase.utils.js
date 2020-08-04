import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDCxOGozKgUce7LFtwQxvgZsheJ5z6vM3o",
    authDomain: "crown-db-5b2f8.firebaseapp.com",
    databaseURL: "https://crown-db-5b2f8.firebaseio.com",
    projectId: "crown-db-5b2f8",
    storageBucket: "crown-db-5b2f8.appspot.com",
    messagingSenderId: "281335463858",
    appId: "1:281335463858:web:f67d29918d5a4ba0b7eeab",
    measurementId: "G-Z0N5M7TCYZ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;   

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;