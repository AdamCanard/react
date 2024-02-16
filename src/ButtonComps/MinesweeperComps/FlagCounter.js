import { useContext } from "react";
import { ValContext } from "./Board";

export default function FlagCounter() {
  const { bombs, numFlags } = useContext(ValContext);
  console.log(bombs - numFlags);
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
    </>
  );
}
