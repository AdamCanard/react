import { useState, useEffect, useCallback } from "react";
import Cell from "./Cell.js";

export default function Board({ row, col, bombs }) {
  const [grid, setGrid] = useState(
    Array(row)
      .fill()
      .map(() => new Array(col).fill(0))
  );
  const [renderedGrid, setRenderedGrid] = useState(
    grid.map((row, i) =>
      row.map((col, j) => (
        <Cell
          key={j}
          val={col}
          row={i}
          col={j}
          checkVal={checkVal}
          openBox={openBox}
        />
      ))
    )
  );

  const gridStyle = {
    display: "grid",
    height: "500px",
    width: "500px",
    alignItems: "center",
    gridTemplateColumns: "repeat(5, 100px)",
    gridTemplateRows: "repeat(5, 100px)",
    border: "2px solid black",
  };

  const boardGen = () => {
    const newGrid = grid;
    for (let i = 0; i < bombs; i++) {
      let tempR = Math.floor(Math.random() * row);
      let tempC = Math.floor(Math.random() * col);
      if (newGrid[tempR][tempC] == 0) {
        newGrid[tempR][tempC] = "B";
      } else {
        i--;
      }
    }
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (newGrid[i][j] == "B") {
        } else {
          newGrid[i][j] = countBombs(newGrid, i, j);
        }
      }
    }
    setGrid(newGrid);
  };

  const renderGrid = () => {
    const newGrid = grid.map((row, i) =>
      row.map((col, j) => (
        <Cell
          key={j}
          val={col}
          row={i}
          col={j}
          checkVal={checkVal}
          openBox={openBox}
        />
      ))
    );
    console.log(grid);
    setRenderedGrid(newGrid);
  };

  function countBombs(board, row, col) {
    let count = 0;
    if (row != 0) {
      if (board[row - 1][col - 1] == "B") {
        count++;
      }
      if (board[row - 1][col] == "B") {
        count++;
      }
      if (board[row - 1][col + 1] == "B") {
        count++;
      }
    }

    if (board[row][col - 1] == "B") {
      count++;
    }
    if (board[row][col + 1] == "B") {
      count++;
    }

    if (row != 4) {
      if (board[row + 1][col - 1] == "B") {
        count++;
      }
      if (board[row + 1][col] == "B") {
        count++;
      }
      if (board[row + 1][col + 1] == "B") {
        count++;
      }
    }

    return count;
  }

  function checkVal(i, j) {
    return grid[i][j];
  }

  function openBox(i, j) {
    console.log(grid[i][j]);
  }

  function Update() {
    boardGen();
    renderGrid();
  }

  const boardReset = () => {
    const newGrid = Array(row)
      .fill()
      .map(() => new Array(col).fill(0));
    setGrid(newGrid);
    renderGrid();
  };

  return (
    <>
      <div style={gridStyle}>{renderedGrid}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "10%",
          width: "500px",
        }}
      >
        <button style={{ width: "50%", height: "100%" }} onClick={Update}>
          Generate Board
        </button>
        <button style={{ width: "50%", height: "100%" }} onClick={boardReset}>
          Reset Board
        </button>
      </div>
    </>
  );
}
