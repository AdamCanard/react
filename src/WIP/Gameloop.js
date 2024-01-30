import { useState, useEffect } from "react";

export default function Gameloop() {
  const [time, setTime] = useState(() => new Date());
  const [x, setX] = useState(250);
  const [y, setY] = useState(250);
  const [guyX, setGuyX] = useState(100);
  const [guyY, setGuyY] = useState(100);
  const [pause, setPause] = useState(true);
  const [speed, setSpeed] = useState(100);
  const style = {
    position: "absolute",
    height: "50px",
    width: "50px",
    border: "2px black solid",
    backgroundColor: "white",
    color: "black",
    marginTop: y,
    marginLeft: x,
    transition: ".1s",
  };

  const guyStyle = {
    position: "absolute",
    height: "50px",
    width: "50px",
    border: "2px black solid",
    backgroundColor: "red",
    color: "black",
    marginTop: guyY,
    marginLeft: guyX,
    transition: ".2s",
  };

  function keyHandler(e) {
    if (e.key === "ArrowUp") {
      setY(y - 50);
    } else if (e.key === "ArrowDown") {
      setY(y + 50);
    } else if (e.key === "ArrowRight") {
      setX(x + 50);
    } else if (e.key === "ArrowLeft") {
      setX(x - 50);
    } else {
    }
    moveGuy();
  }

  function moveGuy() {
    if (pause) {
    } else if (x == guyX && y == guyY) {
      alert("caught");
      setGuyX(100);
      setGuyY(100);
    } else {
      if (x == guyX) {
        if (y >= guyY) {
          setGuyY(guyY + 10);
        } else {
          setGuyY(guyY - 10);
        }
      } else if (y == guyY) {
        if (x >= guyX) {
          setGuyX(guyX + 10);
        } else {
          setGuyX(guyX - 10);
        }
      } else {
        if (y >= guyY) {
          setGuyY(guyY + 10);
        } else {
          setGuyY(guyY - 10);
        }
        if (x >= guyX) {
          setGuyX(guyX + 10);
        } else {
          setGuyX(guyX - 10);
        }
      }
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      moveGuy();
    }, speed);
    window.addEventListener("keydown", keyHandler);

    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", keyHandler);
    };
  });

  function Pause() {
    setPause(!pause);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        height: "90%",
        width: "90%",
      }}
    >
      <button
        style={{ height: "50px", width: "75px" }}
        onClick={Pause}
      ></button>
      <input
        style={{ height: "50px", width: "100px" }}
        type="range"
        min="0"
        max="200"
        defaultValue={100}
        dir="rtl"
        onInput={(e) => setSpeed(e.target.value)}
      ></input>
      <div style={style}> </div>
      <div style={guyStyle}> </div>
    </div>
  );
}
