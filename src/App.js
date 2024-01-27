import "./styles.css";
import { useState, useCallback, useEffect } from "react";

import Clock from "./Clock";
import Taskbar from "./Taskbar";
import Grid from "./Grid";

const flexStyleCenter = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  flexDirection: "column",
  placeContent: "center",
  textAlign: "center",
  alignItems: "center",
  position: "relative",
};

function App() {
  return (
    <div style={flexStyleCenter}>
      <Screen />
    </div>
  );
}
export default App;

function Screen() {
  const screenStyle = {
    display: "grid",
    width: "100vw",
    height: "100vh",
    gridTemplateColumns: "100%",
    backgroundColor: "#FF784F",
    justifyContent: "space-evenly",
    textAlign: "center",
    alignItems: "center",
  };
  const midCol = {
    display: "grid",
    width: "100%",
    height: "100%",
    gridTemplateColumns: "100%",
    gridTemplateRows: "15% 85%",
    justifyContent: "space-evenly",
    textAlign: "center",
    alignItems: "center",
  };

  return (
    <div style={screenStyle}>
      <div className="midCol" style={midCol}>
        <Clock />
        <Taskbar />
      </div>
    </div>
  );
}
