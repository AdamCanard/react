import { useContext } from "react";
import { ValContext } from "./Board";
import timerImageList from "./TimerNum";

export default function FlagCounter() {
  const { bombs, numFlags } = useContext(ValContext);
  let bombsLeft = bombs - numFlags;
  return (
    <>
      <img
        src={timerImageList[Math.floor((bombsLeft / 100) % 10)]}
        style={{ height: "100%", backgroundColor: "white" }}
      ></img>
      <img
        src={timerImageList[Math.floor((bombsLeft / 10) % 10)]}
        style={{ height: "100%", backgroundColor: "white" }}
      ></img>
      <img
        src={timerImageList[Math.floor(bombsLeft % 10)]}
        style={{ height: "100%", backgroundColor: "white" }}
      ></img>
    </>
  );
}
