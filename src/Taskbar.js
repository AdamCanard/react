import { useState } from "react";
import logo from "./Computer-icon.png";

export default function Taskbar() {
  const [color, setColor] = useState("#FFEDC2");
  const style = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    width: "100%",
    height: "70%",
    gridRow: 1,
    backgroundColor: "#3A3042",
    outline: "2px black solid",
    borderRadius: 50,
  };

  function changeButton1() {
    if (color === "#FFEDC2") {
      setColor("#A6D274");
    } else {
      setColor("#FFEDC2");
    }
  }
  return (
    <div className="temp " style={style}>
      <Title title="Adam's Website" src={logo} />
      <ButtonRow
        button1={() => changeButton1()}
        button2={() => console.log("button2")}
        button3={() => alert("button3")}
        color={color}
      />
    </div>
  );
}

function Title({ title, src }) {
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
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
  };
  return (
    <div style={divStyle}>
      <img style={imageStyle} src={src} alt={title} />
      <div style={titleStyle}>{title}</div>
    </div>
  );
}

function ButtonRow({ button1, button2, button3, color }) {
  const divStyle = {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    justifyContent: "space-Evenly",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    fontFamily: "courier new",
    fontSize: "1.5em",
    fontWeight: "700",
    color: color,
  };
  return (
    <div style={divStyle}>
      <button onClick={button1} style={buttonStyle}>
        Button1
      </button>
      <button onClick={button2} style={buttonStyle}>
        Button2
      </button>
      <button onClick={button3} style={buttonStyle}>
        Button3
      </button>
    </div>
  );
}
