import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { getUserId } from './feedIdManager';

var firebaseConfig = {
    apiKey: "AIzaSyAxdiOlnFBRP-FEoGZnKhJQkQ4BTL4Thyg",
    authDomain: "feed-organizer-dnd.firebaseapp.com",
    projectId: "feed-organizer-dnd",
    storageBucket: "feed-organizer-dnd.appspot.com",
    messagingSenderId: "213407916290",
    appId: "1:213407916290:web:91f40215bae0983f6be21b",
    measurementId: "G-PL68B1EN6C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
var db = firebase.firestore();

export function updateImagePositions(imagePositions) {
    var updateImagePositionsPromise = new Promise(function(resolve, reject) {
        db.collection("users").doc(getUserId()).set(imagePositions)
        .then(function(docRef) {
            resolve(docRef);
        });
    });

    return updateImagePositionsPromise;
}

export  {
    storage, firebase as default
}