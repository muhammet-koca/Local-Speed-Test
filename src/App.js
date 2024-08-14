import React from "react";
import SpeedTest from "./components/SpeedTest";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <h1 className="title">Local Internet Speed</h1>
      <SpeedTest />
    </div>
  );
};

export default App;
