import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDOb3r_kwpRueiYBiwE1bkIfCs037IRMY8",
    authDomain: "ar-webdesigns.firebaseapp.com",
    databaseURL: "https://ar-webdesigns.firebaseio.com",
    projectId: "ar-webdesigns",
    storageBucket: "ar-webdesigns.appspot.com",
    messagingSenderId: "81622708912",
    appId: "1:81622708912:web:b90905a2e4e165bbf40175"
};

firebase.initializeApp(config);
// const firestoreRef = firebase.firestore();
// firestoreRef.settings({timestampsInSnapshots: true});
// export const storesRef = firestoreRef;
// const databaseRef = firebase.database().ref();
// export const storesRef = databaseRef.child("todos");
const db = firebase.firestore();
export default db;