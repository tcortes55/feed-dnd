import './App.css';
import Board from './components/board';
import img1 from './images/b1.jpg';
import img2 from './images/b2.jpg';
import img3 from './images/b3.jpg';

function App({ imagePositions }) {

  return (
    <Board imagePositions={imagePositions}></Board>
  );
}

export default App;
