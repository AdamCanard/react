import { useState, useEffect, useCallback } from "react";
import Cell from "./Cell.js";

export default function Board({ maxRow, maxCol, bombs }) {
  const boardGen = () => {
    const newGrid = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        const tempObj = {
          objRow: i,
          objCol: j,
          objVal: 0,
          objState: "closed",
        };

        newGrid[i][j] = tempObj;
      }
    }
    for (let i = 0; i < bombs; i++) {
      let tempR = Math.floor(Math.random() * maxRow);
      let tempC = Math.floor(Math.random() * maxCol);
      if (newGrid[tempR][tempC].objVal === 0) {
        newGrid[tempR][tempC].objVal = "B";
      } else {
        i--;
      }
    }
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        if (newGrid[i][j].objVal === "B") {
        } else {
          newGrid[i][j].objVal = countBombs(newGrid, i, j);
        }
      }
    }
    return newGrid;
  };

  const [grid, setGrid] = useState(boardGen);

  const gridStyle = {
    display: "grid",
    height: "500px",
    width: "500px",
    alignItems: "center",
    gridTemplateColumns: "repeat(" + maxCol + ", " + 500 / maxCol + "px)",
    gridTemplateRows: "repeat(" + maxRow + ", " + 500 / maxRow + "px)",
    border: "2px solid black",
  };

  function countBombs(board, row, col) {
    let count = 0;
    if (row != 0) {
      if (col != 0) {
        if (board[row - 1][col - 1].objVal === "B") {
          count++;
        }
      }
      if (board[row - 1][col].objVal === "B") {
        count++;
      }
      if (col != maxCol - 1) {
        if (board[row - 1][col + 1].objVal === "B") {
          count++;
        }
      }
    }

    if (col != 0) {
      if (board[row][col - 1].objVal === "B") {
        count++;
      }
    }
    if (col != maxCol - 1) {
      if (board[row][col + 1].objVal === "B") {
        count++;
      }
    }

    if (row != maxRow - 1) {
      if (col != 0) {
        if (board[row + 1][col - 1].objVal === "B") {
          count++;
        }
      }
      if (board[row + 1][col].objVal === "B") {
        count++;
      }
      if (col != maxCol - 1) {
        if (board[row + 1][col + 1].objVal === "B") {
          count++;
        }
      }
    }

    return count;
  }

  function openAllZero(row, col) {
    const temp = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    Object.assign(temp, grid);
    temp[row][col].objVal = 9;
    temp[row][col].objState = "show";

    if (col != maxCol - 1) {
      if (temp[row][col + 1].objVal === 0) {
        openAllZero(row, col + 1);
      } else {
        temp[row][col + 1].objState = "show";
      }
    }

    if (col != 0) {
      if (temp[row][col - 1].objVal === 0) {
        openAllZero(row, col - 1);
      } else {
        temp[row][col - 1].objState = "show";
      }
    }

    if (row != maxRow - 1) {
      if (temp[row + 1][col].objVal === 0) {
        openAllZero(row + 1, col);
      } else {
        temp[row + 1][col].objState = "show";
      }
    }

    if (row != 0) {
      if (temp[row - 1][col].objVal === 0) {
        openAllZero(row - 1, col);
      } else {
        temp[row - 1][col].objState = "show";
      }
    }
    setGrid(temp);
  }

  const boardReset = () => {
    const newGrid = boardGen();
    setGrid(newGrid);
  };

  return (
    <>
      <div style={gridStyle}>
        {Object.values(grid).map((row, index) => {
          return Object.values(row).map((cell, col) => {
            return (
              <Cell
                obj={cell}
                height={500 / maxRow}
                width={500 / maxCol}
                openAllZero={openAllZero}
                key={"row:" + index + " col:" + col}
              />
            );
          });
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "10%",
          width: "500px",
        }}
      >
        <button style={{ width: "50%", height: "100%" }} onClick={boardReset}>
          Regen Board
        </button>
      </div>
    </>
  );
}
