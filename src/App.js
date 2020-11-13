import logo from './logo.svg';
import './App.css';
import Picture from './components/picture';
import Square from './components/square';
import img1 from './images/b1.jpg';
import img2 from './images/b2.jpg';
import img3 from './images/b3.jpg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Square fill></Square>
        <Square></Square>
        <Square fill>
          <Picture imgPath={img2}></Picture>
        </Square>
        <Square></Square>
        <Picture imgPath={img1}></Picture>
        <Picture imgPath={img3}></Picture>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
