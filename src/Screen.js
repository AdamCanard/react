import "./styles.css";
import { useState } from "react";

import Clock from "./ButtonComps/Clock";
import Taskbar from "./Taskbar";
import Homepage from "./ButtonComps/Homepage";

import Dev from "./ButtonComps/Dev";
import Minesweeper from "./ButtonComps/Minesweeper";

export default function Screen() {
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
