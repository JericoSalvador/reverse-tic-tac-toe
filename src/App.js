import './App.css';
import { Board } from './components/Board'
import { useEffect } from 'react'

function App() {
  
  useEffect(()=>{
    document.title="Reverse Tic-Tac-Toe"
  },[])
  return (
    <div style = {{display:'flex'}} className="App">
      <Board />
    </div>
  );
}

export default App;
