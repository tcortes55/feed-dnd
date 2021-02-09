import './App.css';
import Board from './components/board';

function App({ imagePositions }) {

  return (
    <Board imagePositions={imagePositions}></Board>
  );
}

export default App;
