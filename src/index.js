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

const imagePositions = [];

imagePositions.push([0, null]);
imagePositions.push([1, null]);
imagePositions.push([2, img1]);
imagePositions.push([3, null]);
imagePositions.push([4, img2]);
imagePositions.push([5, img3]);
imagePositions.push([6, null]);
imagePositions.push([7, null]);
imagePositions.push([8, null]);

observe(imagePositions, (imagePositions) => 
  ReactDOM.render(
    <React.StrictMode>
      <Board imagePositions={imagePositions}></Board>
    </React.StrictMode>,
    document.getElementById('root')
    )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
