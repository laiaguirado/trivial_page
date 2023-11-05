import { useState } from "react";
import "./App.css";
import TrivialList from './components/TrivialList';
import TrivialButtons from "./components/TrivialButtons";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <TrivialList /> 
        <TrivialButtons/>
      </header>
    </div>
  );
}

export default App;
