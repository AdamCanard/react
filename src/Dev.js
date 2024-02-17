import {useState, useEffect, useCallback, useReducer} from "react";

export default function Dev() {
  return <Gameloop />;
}
const moveReducer = (state,action)=>{
  switch (action.type){
    case("move"):
      return{
        x: (state.x + action.x),
        y: (state.y + action.y),
      }
      break
    case("decrement"):

      break
  }
}
function Gameloop() {
  const [time, setTime] = useState(() => new Date());
  const [x, setX] = useState(250);
  const [y, setY] = useState(250);
  const [guyX, setGuyX] = useState(100);
  const [guyY, setGuyY] = useState(100);
  const [pause, setPause] = useState(true);
  const [speed, setSpeed] = useState(100);
  const [position,positionDispatch] = useReducer(moveReducer,{x:250,y:250},undefined)
  const [pressed, setPressed] = useState([]);
  const style = {
    position: "absolute",
    height: "50px",
    width: "50px",
    border: "2px black solid",
    backgroundColor: "white",
    color: "black",
    top: position.y,
    left: position.x,
    transition: "100ms",
  };

  const guyStyle = {
    position: "absolute",
    height: "50px",
    width: "50px",
    border: "2px black solid",
    backgroundColor: "red",
    color: "black",
    top: guyY,
    left: guyX,
    transition: "100ms",
  };

  function keyHandler(e) {
    let currentPressed = Object.assign([],pressed);
    if(!currentPressed.includes(e.key)){
      currentPressed.push(e.key)
      console.log(currentPressed)
    }
    setPressed(currentPressed)
    // if (e.key === "ArrowUp") {
    //   setY(y - 50);
    // } else if (e.key === "ArrowDown") {
    //   setY(y + 50);
    // } else if (e.key === "ArrowRight") {
    //   setX(x + 50);
    // } else if (e.key === "ArrowLeft") {
    //   setX(x - 50);
    // } else {
    // }
    // moveGuy();
    movePlayer(currentPressed)
  }
  const moveVal = 25;
  const movePlayer =(currentPressed)=>{
    let xSum = 0;
    let ySum = 0;
    for(let key of currentPressed)
    {
      switch(key){
        case("ArrowUp"):
          ySum -= moveVal;
          break
        case("ArrowDown"):
          ySum += moveVal;
          break
        case("ArrowLeft"):
          xSum -= moveVal;
          break
        case("ArrowRight"):
          xSum += moveVal;
          break
      }
    }
    positionDispatch({type:"move",x:xSum,y:ySum})
  }
  function moveGuy() {
    if (pause) {
    } else if (x === guyX && y === guyY) {
      alert("caught");
      setGuyX(100);
      setGuyY(100);
    } else {
      if (x === guyX) {
        if (y >= guyY) {
          setGuyY(guyY + 10);
        } else {
          setGuyY(guyY - 10);
        }
      } else if (y === guyY) {
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
const keyCleaner =(e)=>{
  let currentPressed = Object.assign([],pressed);
  if(currentPressed.includes(e.key)){
    currentPressed.splice(currentPressed.indexOf(e.key))
  }
  setPressed(currentPressed)
}
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      // console.log("wouldMove")
      // movePlayer();
      moveGuy();
    }, speed);
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keyup",keyCleaner)
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("keyup", keyCleaner);
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
      {Object.values(pressed).map(key=>{
        return<p>{key}</p>
      })}
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
