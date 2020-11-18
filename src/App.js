import logo from './logo.svg';
import './App.css';
import Picture from './components/picture';
import Square from './components/square';
import Board from './components/board';
import img1 from './images/b1.jpg';
import img2 from './images/b2.jpg';
import img3 from './images/b3.jpg';

function App() {

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

  return (
    <div className="App">
      <header className="App-header">
        
        <Board imagePositions={imagePositions}></Board>

      </header>
    </div>
  );
}

export default App;
