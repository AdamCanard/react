import { useState } from "react";

export default function Player() {
  const [color, setColor] = useState("black");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // const keyHandler = useCallback((e) => {
  //   if (e.key === "ArrowUp") {
  //     setY(y - 10);
  //   } else if (e.key === "ArrowDown") {
  //     setY(y + 10);
  //   } else if (e.key === "ArrowRight") {
  //     setX(x + 10);
  //   } else if (e.key === "ArrowLeft") {
  //     setX(x - 10);
  //   } else {
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("keydown", keyHandler);

  //   return () => window.removeEventListener("keydown", keyHandler);
  // }, [keyHandler]);

  return (
    <div>
      <div
        className="block"
        style={{ backgroundColor: color, marginTop: y, marginLeft: x }}
      ></div>
      <input type="text" onChange={(e) => setColor(e.target.value)}></input>

      <div className="movement">
        <div className="up" onClick={() => setY(y - 10)}>
          up
        </div>
        <div className="left" onClick={() => setX(x - 10)}>
          left
        </div>
        <div className="down" onClick={() => setY(y + 10)}>
          down
        </div>
        <div className="right" onClick={() => setX(x + 10)}>
          right
        </div>
      </div>
    </div>
  );
}
