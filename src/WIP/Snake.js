import "./styles.css";
import { useState, useCallback, useEffect } from "react";
import Grid from "../Grid.js";
import Block from "./Block.js";

const blocks = [];
let count = 0;
const flexStyleCenter = {
  display: "flex",
  placeContent: "center",
  textAlign: "center",
  alignItems: "center",
};

function Snake() {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [appleX, setAppleX] = useState(2);
  const [appleY, setAppleY] = useState(2);
  const [prev, setPrev] = useState({ x, y, count });
  const right = () => {
    setPrev({ x, y, count });
    setX(x + 1);
  };
  const left = () => {
    setPrev({ x, y, count });
    setX(x - 1);
  };
  const up = () => {
    setPrev({ x, y, count });
    setY(y - 1);
  };
  const down = () => {
    setPrev({ x, y, count });
    setY(y + 1);
  };
  const moveApple = () => {
    setAppleX(appleX + 1);
    setAppleY(appleY + 1);
    count++;
  };
  const checkCollision = () => {
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].x == x && blocks[i].y == y) {
        console.log("crash");
      }
    }
  };

  const myShift = () => {
    let holder = blocks[0];
    blocks.shift();
    for (let i = 0; i < blocks.length; i++) {
      let temp = blocks[i].count;
      blocks[i].count = holder.count;
      holder.count = temp;
    }
  };

  const keyHandler = useCallback((e) => {
    if (e.key === "ArrowUp") {
      up();
    } else if (e.key === "ArrowDown") {
      down();
    } else if (e.key === "ArrowRight") {
      right();
    } else if (e.key === "ArrowLeft") {
      left();
    } else {
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    blocks.push(prev);
    if (appleX == x && appleY == y) {
      moveApple();
    } else {
      myShift();
    }

    console.log(blocks);
    count = blocks.length;

    return () => window.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <div className="main" style={flexStyleCenter}>
        <div>
          {x} {y}
        </div>
        <Grid col={10} row={10} height={500} width={500}>
          <Block col={appleX} row={appleY} color="red" />
          <Block col={x} row={y} color="green" />
          {blocks.map((block) => (
            <Block
              col={block.x}
              row={block.y}
              key={block.count}
              color="green"
            />
          ))}
        </Grid>
      </div>
    </>
  );
}
export default Snake;
