import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Board from './components/board';
import { observe, initialLoad } from './PictureManager';
import { getUserId } from './firebase/feedIdManager';
import { getImagePositions } from './firebase/firebase';
import firebase from './firebase/firebase';


function generateEmptyTemplate() {
  var imagesDictionary = {};

  imagesDictionary.feed = {};
  imagesDictionary.feed[0] = null;
  imagesDictionary.feed[1] = null;
  imagesDictionary.feed[2] = null;
  imagesDictionary.feed[3] = null;
  imagesDictionary.feed[4] = null;
  imagesDictionary.feed[5] = null;
  imagesDictionary.feed[6] = null;
  imagesDictionary.feed[7] = null;
  imagesDictionary.feed[8] = null;

  imagesDictionary.deck = {};
  imagesDictionary.deck[0] = null;
  imagesDictionary.deck[1] = null;
  imagesDictionary.deck[2] = null;
  imagesDictionary.deck[3] = null;

  return imagesDictionary;
};

var imagesDictionary = generateEmptyTemplate();
let init = false;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("isAnonymous=" + user.isAnonymous);
    console.log("email=" + user.email);
   
    if (!init) {
      startApp();
    } 
  }
  else {
    firebase.auth().signInAnonymously().then(function() {
      if (!init) {
        startApp();
      }
      else {
        console.log("esvaziando");
        initialLoad(generateEmptyTemplate());
      }
    });
  }
});

function startApp() {
  init = true;

  var positions = getImagePositions().then(function(result) {
    if (result.imagePositions) {
      imagesDictionary = result.imagePositions;
    }
    
    observe(imagesDictionary, (imagesDictionary) => 
    ReactDOM.render(
      <React.StrictMode>
      <App imagePositions={imagesDictionary}></App>
    </React.StrictMode>,
    document.getElementById('root')
    )
    );
  });
}