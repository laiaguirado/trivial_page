import React, { useState, useEffect } from "react";
import "./App.css";
import TrivialTest from "./components/TrivialTest";
import TrivialGame from "./components/TrivialGame";

function App() {
  const [mode, setMode] = useState("test");

  return (
    <div className="App">
      <header className="App-header">
        <select value={mode} onChange={(e) => { setMode(e.target.value) }}>
          <option value="test"> Test mode</option>
          <option value="game" >Game mode</option>
        </select>
        {mode === "test" ? <TrivialTest /> : <TrivialGame />}
      </header>
    </div>
  );
}

export default App;
