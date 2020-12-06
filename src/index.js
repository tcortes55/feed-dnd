import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Board from './components/board';
import { observe } from './PictureManager';
import img1 from './images/b1.jpg';
import img2 from './images/b2.jpg';
import img3 from './images/b3.jpg';

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
imagesDictionary.deck[0] = img1;
imagesDictionary.deck[1] = img2;
imagesDictionary.deck[2] = img3;
imagesDictionary.deck[3] = null;
imagesDictionary.deck[4] = null;
imagesDictionary.deck[5] = null;
imagesDictionary.deck[6] = null;
imagesDictionary.deck[7] = null;
imagesDictionary.deck[8] = null;

observe(imagesDictionary, (imagesDictionary) => 
  ReactDOM.render(
    <React.StrictMode>
      <Board imagePositions={imagesDictionary}></Board>
    </React.StrictMode>,
    document.getElementById('root')
    )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
