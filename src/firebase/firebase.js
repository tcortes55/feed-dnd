import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
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
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // autoUpgradeAnonymousUsers: true,
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_I
      {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
      },

      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

export function startUi() {
    ui.start('#firebaseui-auth-container', uiConfig);
}

export function getImagePositions() {
    var getImagePositionsPromise = new Promise(function(resolve, reject) {
        var imagePositions = {};
        
        db.collection("users").doc(getUserId()).get().then(function(doc) {
            if (doc.exists) {
                imagePositions = doc.data();
            }

            resolve(imagePositions);
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    });

    return getImagePositionsPromise;
}

export function updateImagePositions(imagePositions) {
    var updateImagePositionsPromise = new Promise(function(resolve, reject) {
        db.collection("users").doc(getUserId()).set({ imagePositions: imagePositions})
        .then(function(docRef) {
            resolve(docRef);
        });
    });

    return updateImagePositionsPromise;
}

export function deleteImageFromStorage(imageUrl) {
    var imageFileRef = firebase.storage().refFromURL(imageUrl);
    imageFileRef.delete().then(function() {
        console.log("File deleted!");
    })
}

export  {
    storage, firebase as default
}