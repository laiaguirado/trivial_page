import { useState } from "react";
import "./App.css";
import TrivialList from './components/TrivialList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <TrivialList /> 
      </header>
    </div>
  );
}

export default App;
