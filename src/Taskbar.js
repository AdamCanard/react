import { useState } from "react";
import logo from "./Computer-icon.png";

export default function Taskbar({
  homePage,
  clockOn,
  switchMode,
  minesweeper,
  dev,
  pass,
  color,
}) {
  const TaskbarStyle = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    width: "78rem",
    height: "70%",
    gridRow: 1,
    backgroundColor: "#3A3042",
    outline: "2px black solid",
    borderRadius: 50,
    alignItems: "center",
  };

  const SidebarStyle = {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    height: "95%",
    gridRow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#3A3042",
    outline: "2px black solid",
    marginLeft: "5px",
    borderRadius: 50,
  };

  return (
    <div className="temp" style={pass ? SidebarStyle : TaskbarStyle}>
      <Title title="Adam's Website" src={logo} pass={pass} />
      <ButtonGroup
        button1={homePage}
        button2={clockOn}
        button3={minesweeper}
        button4={dev}
        button5={switchMode}
        color={color}
        pass={pass}
      />
    </div>
  );
}

function Title({ title, src, pass }) {
  const imageStyle = {
    height: "60px",
    width: "60px",
    paddingRight: "10%",
    paddingLeft: "3%",
  };
  const titleStyle = {
    fontFamily: "courier new",
    fontSize: "2em",
    fontWeight: "700",
    color: "#FFEDC2",
  };

  const divStyle = {
    display: "flex",
    flexDirection: pass ? "column" : "row",
    width: "100%",
    height: pass ? "35%" : "100%",
    alignItems: "center",
  };
  return (
    <div style={divStyle}>
      <img style={imageStyle} src={src} alt={title} />
      <div style={titleStyle}>{title}</div>
    </div>
  );
}

function ButtonGroup({
  button1,
  button2,
  button3,
  button4,
  button5,
  color,
  pass,
}) {
  const divStyle = {
    display: "flex",
    flexDirection: pass ? "column" : "row",
    height: "100%",
    width: "100%",
    justifyContent: pass ? "start" : "space-Evenly",
    columnGap: pass ? "10px" : "",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    fontFamily: "courier new",
    fontSize: "1.5em",
    fontWeight: "700",
    color: color,
    paddingTop: "10px",
  };
  return (
    <div style={divStyle}>
      <button onClick={button1} style={buttonStyle}>
        Home Page
      </button>
      <button onClick={button2} style={buttonStyle}>
        Clock
      </button>
      <button onClick={button3} style={buttonStyle}>
        MineSweeper
      </button>
      <button onClick={button4} style={buttonStyle}>
        Dev
      </button>
      <button onClick={button5} style={buttonStyle}>
        Mode
      </button>
    </div>
  );
}
