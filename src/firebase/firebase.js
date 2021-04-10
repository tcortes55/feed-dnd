import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getUserId } from './feedIdManager';
import { initialLoad } from '../PictureManager';

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
var data = null;

export function startUi() {
    console.log("startUi");
    ui.start('#firebaseui-auth-container', uiConfig);
}

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log("authResult=" + authResult.user);
          console.log("authResult isAnon=" + authResult.user.isAnonymous);
          if (authResult.user && authResult.user.isAnonymous)
          {
              console.log("authResult entra no if");
              ui.reset();
              startUi();
          }
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      signInFailure: function(error) {
        if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
          return Promise.resolve();
        }
        // The credential the user tried to sign in with.
        var cred = error.credential;
        var currentUser = firebase.auth().currentUser;
        
        return firebase.auth().signInWithCredential(cred)
            .then(function() {
                var positions = getImagePositions().then(function(result) {
                    if (result.imagePositions) {
                        initialLoad(result.imagePositions);
                    }
                });
            })
            .then(function() {
                if (currentUser.isAnonymous) {
                    currentUser.delete();
                    deleteUserData(currentUser.uid);
                }
            });


        // If using Firebase Realtime Database. The anonymous user data has to be
        // copied to the non-anonymous user.
        var app = firebase.app();
        // Save anonymous user data first.
        return db.ref('users/' + firebase.auth().currentUser.uid)
            .once('value')
            .then(function(snapshot) {
              data = snapshot.val();
              // This will trigger onAuthStateChanged listener which
              // could trigger a redirect to another page.
              // Ensure the upgrade flow is not interrupted by that callback
              // and that this is given enough time to complete before
              // redirection.
              return firebase.auth().signInWithCredential(cred);
            })
            .then(function(user) {
              // Original Anonymous Auth instance now has the new user.
              return db.ref('users/' + user.uid).set(data);
            })
            .then(function() {
              // Delete anonymnous user.
              return currentUser.delete();
            }).then(function() {
              // Clear data in case a new user signs in, and the state change
              // triggers.
              data = null;
              // FirebaseUI will reset and the UI cleared when this promise
              // resolves.
              // signInSuccessWithAuthResult will not run. Successful sign-in
              // logic has to be run explicitly.
              window.location.assign('<url-to-redirect-to-on-success>');
            });
  
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    autoUpgradeAnonymousUsers: true,
    signInFlow: 'popup',
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_I
      {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
          forceSameDevice: true
      },

      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

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

function deleteUserData(uid) {
    db.collection("users").doc(uid).delete();
    deleteFolderContents(`images/${uid}`);
}

function deleteFolderContents(path) {
    const ref = storage.ref(path);
    ref.listAll()
      .then(dir => {
        dir.items.forEach(fileRef => {
          deleteFile(ref.fullPath, fileRef.name);
        });
        dir.prefixes.forEach(folderRef => {
          deleteFolderContents(folderRef.fullPath);
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  function deleteFile(pathToFile, fileName) {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete()
  }

export  {
    storage, firebase as default
}