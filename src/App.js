import "./styles.css";
import { useState, useCallback, useEffect } from "react";

import Clock from "./Clock";
import Taskbar from "./Taskbar";
import Homepage from "./Homepage";

import Dev from "./Dev";
import Minesweeper from "./Minesweeper";

const flexStyleCenter = {
  display: "flex",
  width: "100%",
  height: "100vh",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  position: "relative",
};

function App() {
  return (
    <div className="AppDiv" style={flexStyleCenter}>
      <Screen />
    </div>
  );
}
export default App;

function Screen() {
  const [gamer, setGamer] = useState(false);
  const [current, setCurrent] = useState("homepage");

  const screenStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
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
    justifyItems: "center",
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

  function compMinesweeper() {
    setCurrent("minesweeper");
  }

  function compDev() {
    setCurrent("dev");
  }

  return (
    <div className="ScreenDiv" style={screenStyle}>
      <div className="midCol" style={gamer ? gamerMode : midCol}>
        <Taskbar
          homePage={compHomepage}
          clockOn={compClock}
          switchMode={switchMode}
          minesweeper={compMinesweeper}
          dev={compDev}
          pass={gamer}
          color={"#FFEDC2"}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {current == "clock" ? <Clock /> : <></>}
          {current == "dev" ? <Dev /> : <></>}
          {current == "homepage" ? <Homepage /> : <></>}
          {current == "minesweeper" ? <Minesweeper /> : <></>}
        </div>
      </div>
    </div>
  );
}
