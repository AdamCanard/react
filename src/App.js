import "./styles.css";
import { useState, useCallback, useEffect } from "react";

import Clock from "./Clock";
import Taskbar from "./Taskbar";
import Homepage from "./Homepage";

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
  const [current, setCurrent] = useState("homepage");

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
  function compHomepage() {
    setCurrent("homepage");
  }

  function compClock() {
    setCurrent("clock");
  }
  function compDev() {
    setCurrent("dev");
  }

  return (
    <div style={screenStyle}>
      <div className="midCol" style={gamer ? gamerMode : midCol}>
        <Taskbar
          homePage={compHomepage}
          clockOn={compClock}
          switchMode={switchMode}
          dev={compDev}
          pass={gamer}
          color={"#FFEDC2"}
        />
        <div style={flexStyleCenter}>
          {current == "clock" ? <Clock /> : <></>}
          {current == "dev" ? <Dev /> : <></>}
          {current == "homepage" ? <Homepage /> : <></>}
        </div>
      </div>
    </div>
  );
}
