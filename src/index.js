import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Board from './components/board';
import { observe } from './PictureManager';
import { getUserId } from './firebase/feedIdManager';
import { getImagePositions } from './firebase/firebase';

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

var positions = getImagePositions().then(function(result) {
  if (result.imagePositions) {
    imagesDictionary = result.imagePositions;
  }

  observe(imagesDictionary, (imagesDictionary) => 
    ReactDOM.render(
      <React.StrictMode>
        <Board imagePositions={imagesDictionary}></Board>
      </React.StrictMode>,
      document.getElementById('root')
      )
  );
});