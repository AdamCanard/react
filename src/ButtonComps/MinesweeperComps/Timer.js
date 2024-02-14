import { useState, useRef, useEffect } from "react";
import timerImageList from "./TimerNum";

export default function Timer() {
  const [startTime, setStartTime] = useState(null);
  const [nowTime, setNowTime] = useState(null);
  const intervalRef = useRef(null);

  // function startTimer() {
  useEffect(() => {
    setStartTime(Date.now());
    setNowTime(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
  }, []);

  // }

  let secondsPassed = 0;
  if (startTime != null && nowTime != null) {
    secondsPassed = (nowTime - startTime) / 1000;
  }

  function handleClick() {
    setStartTime(Date.now());
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
  }

  return (
    <>
      <img
        src={timerImageList[Math.floor((secondsPassed / 100) % 10)]}
        style={{ height: "100%", backgroundColor: "white" }}
      ></img>
      <img
        src={timerImageList[Math.floor((secondsPassed / 10) % 10)]}
        style={{ height: "100%", backgroundColor: "white" }}
      ></img>
      <img
        src={timerImageList[Math.floor(secondsPassed % 10)]}
        style={{ height: "100%", backgroundColor: "white" }}
      ></img>
      <button onClick={handleClick}></button>
    </>
  );
}
