import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Board from './components/board';
import UploadForm from './components/uploadForm';
import { observe } from './PictureManager';
import { getUserId } from './firebase/feedIdManager';

const imagesDictionary = {};

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

console.log(getUserId());

observe(imagesDictionary, (imagesDictionary) => 
  ReactDOM.render(
    <React.StrictMode>
      <UploadForm imagePositions={imagesDictionary}></UploadForm>
      <Board imagePositions={imagesDictionary}></Board>
    </React.StrictMode>,
    document.getElementById('root')
    )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
