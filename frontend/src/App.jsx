import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import "./App.css";
import TrivialTest from "./components/TrivialTest";
import TrivialGame from "./components/TrivialGame";
import { themeIOS, theme } from "./utils/style"

const IOSSwitch = styled((props) => (
  <Switch disableRipple {...props} />
))(themeIOS);

function App() {
  const [mode, setMode] = useState("test");

  return (
    <div className="App">
      <header className="App-header">
        <div className="switch-mode">
          <p>Test Mode</p>
          <FormControlLabel
            control={<IOSSwitch />}
            onChange={(e) => e.target.checked === true ? setMode("game") : setMode("test")}
          />
          <p>Game Mode</p>
        </div>
        {mode === "test" ? <TrivialTest /> : <TrivialGame />}
      </header>
    </div>
  );
}

export default App;
