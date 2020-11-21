import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Board from './components/board';
import { observe } from './PictureManager'
import img1 from './images/b1.jpg';
import img2 from './images/b2.jpg';
import img3 from './images/b3.jpg';

const imagesDictionary = {};

imagesDictionary[0] = null;
imagesDictionary[1] = null;
imagesDictionary[2] = img1;
imagesDictionary[3] = null;
imagesDictionary[4] = img2;
imagesDictionary[5] = img3;
imagesDictionary[6] = null;
imagesDictionary[7] = null;
imagesDictionary[8] = null;

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
