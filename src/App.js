import "./styles.css";
import { useState, useCallback, useEffect } from "react";

import Clock from "./Clock";
import Taskbar from "./Taskbar";

import Dev from "./Dev";

const flexStyleCenter = {
  display: "flex",
  width: "100%",
  height: "100%",
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
  const [gamer, setGamer] = useState(false);
  const [color, setColor] = useState("#FFEDC2");
  const [clock, setClock] = useState(false);
  const [dev, setDev] = useState(true);
  const compList = [clock, dev];

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

  const gamerMode = {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "start",
    textAlign: "center",
    alignItems: "center",
  };

  function switchMode() {
    setGamer(!gamer);
  }
  function changeColor() {
    if (color === "#FFEDC2") {
      setColor("#A6D274");
    } else {
      setColor("#FFEDC2");
    }
  }

  function compClock() {
    setClock(!clock);
  }
  function compDev() {
    setDev(!dev);
  }

  return (
    <div style={screenStyle}>
      <div className="midCol" style={gamer ? gamerMode : midCol}>
        <Taskbar
          changeColor={changeColor}
          clockOn={compClock}
          switchMode={switchMode}
          dev={compDev}
          pass={gamer}
          color={color}
        />
        <div style={flexStyleCenter}>
          {clock ? <Clock /> : <></>}
          {dev ? <Dev /> : <></>}
        </div>
      </div>
    </div>
  );
}
