import { useState, useEffect, useCallback } from "react";
import Cell from "./Cell.js";
import SmileyFace from "./Smiley.png";
import styled from "styled-components";

export default function Board({ maxRow, maxCol, bombs, height, width }) {
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

  const [grid, setGrid] = useState(boardGen);
  const [highlight, setHighlight] = useState(false);
  const [lose, setLose] = useState(false);

  function openAllZero(row, col) {
    const temp = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    Object.assign(temp, grid);

    if (temp[row][col].objState != "flagged") {
      temp[row][col].objVal = 9;
      temp[row][col].objState = "show";
    }

    if (col != maxCol - 1) {
      if (temp[row][col + 1].objVal === 0) {
        openAllZero(row, col + 1);
      } else {
        if (temp[row][col + 1].objState != "flagged") {
          temp[row][col + 1].objState = "show";
        }
      }
      if (row != maxRow - 1) {
        // if (temp[row + 1][col + 1].objVal === 0) {
        //   openAllZero(row + 1, col + 1);
        // } else
        if (
          temp[row + 1][col + 1].objVal != "B" &&
          temp[row + 1][col + 1].objVal != 0
        ) {
          if (temp[row + 1][col + 1].objState != "flagged") {
            temp[row + 1][col + 1].objState = "show";
          }
        }
      }
    }

    if (col != 0) {
      if (temp[row][col - 1].objVal === 0) {
        openAllZero(row, col - 1);
      } else {
        if (temp[row][col - 1].objState != "flagged") {
          temp[row][col - 1].objState = "show";
        }
      }
      if (row != 0) {
        // if (temp[row - 1][col - 1].objVal === 0) {
        //   openAllZero(row - 1, col - 1);
        // } else
        if (
          temp[row - 1][col - 1].objVal != "B" &&
          temp[row - 1][col - 1].objVal != 0
        ) {
          if (temp[row - 1][col - 1].objState != "flagged") {
            temp[row - 1][col - 1].objState = "show";
          }
        }
      }
    }

    if (row != maxRow - 1) {
      if (temp[row + 1][col].objVal === 0) {
        openAllZero(row + 1, col);
      } else {
        if (temp[row + 1][col].objState != "flagged") {
          temp[row + 1][col].objState = "show";
        }
      }
      if (col != 0) {
        // if (temp[row + 1][col - 1].objVal === 0) {
        //   openAllZero(row + 1, col - 1);
        // } else
        if (
          temp[row + 1][col - 1].objVal != "B" &&
          temp[row + 1][col - 1].objVal != 0
        ) {
          if (temp[row + 1][col - 1].objState != "flagged") {
            temp[row + 1][col - 1].objState = "show";
          }
        }
      }
    }

    if (row != 0) {
      if (temp[row - 1][col].objVal === 0) {
        openAllZero(row - 1, col);
      } else {
        if (temp[row - 1][col].objState != "flagged") {
          temp[row - 1][col].objState = "show";
        }
      }
      if (col != maxCol - 1) {
        // if (temp[row - 1][col + 1].objVal === 0) {
        //   openAllZero(row - 1, col + 1);
        // } else
        if (
          temp[row - 1][col + 1].objVal != "B" &&
          temp[row - 1][col + 1].objVal != 0
        ) {
          if (temp[row - 1][col + 1].objState != "flagged") {
            temp[row - 1][col + 1].objState = "show";
          }
        }
      }
    }
    setGrid(temp);
  }

  function countTotalFlags() {
    let flagCount = 0;
    let correctFlags = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        if (grid[i][j].objState === "flagged") {
          flagCount++;
          if (grid[i][j].objVal === "B") {
            correctFlags++;
          }
        }
      }
    }
    if (flagCount === bombs && correctFlags === flagCount) {
      return true;
    } else {
      return false;
    }
  }

  const boardReset = () => {
    const newGrid = boardGen();
    setGrid(newGrid);
  };

  function flagSquare(row, col) {
    const temp = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    Object.assign(temp, grid);
    if (temp[row][col].objState === "closed") {
      temp[row][col].objState = "flagged";
    } else if (temp[row][col].objState === "flagged") {
      temp[row][col].objState = "closed";
    }
    setGrid(temp);
  }

  function openBox(row, col) {
    const temp = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    Object.assign(temp, grid);
    if (temp[row][col].objVal === 0) {
      openAllZero(row, col);
    } else if (temp[row][col].objState === "closed") {
      if (temp[row][col].objVal === "B") {
        setLose(true);
      } else {
        temp[row][col].objState = "show";
      }
    }

    setGrid(temp);
  }

  function countFlags(row, col) {
    let count = 0;
    if (row != 0) {
      if (col != 0) {
        if (grid[row - 1][col - 1].objState === "flagged") {
          count++;
        }
      }
      if (grid[row - 1][col].objState === "flagged") {
        count++;
      }
      if (col != maxCol - 1) {
        if (grid[row - 1][col + 1].objState === "flagged") {
          count++;
        }
      }
    }

    if (col != 0) {
      if (grid[row][col - 1].objState === "flagged") {
        count++;
      }
    }
    if (col != maxCol - 1) {
      if (grid[row][col + 1].objState === "flagged") {
        count++;
      }
    }

    if (row != maxRow - 1) {
      if (col != 0) {
        if (grid[row + 1][col - 1].objState === "flagged") {
          count++;
        }
      }
      if (grid[row + 1][col].objState === "flagged") {
        count++;
      }
      if (col != maxCol - 1) {
        if (grid[row + 1][col + 1].objState === "flagged") {
          count++;
        }
      }
    }

    return count;
  }

  function clearOrHighlight(row, col) {
    let flags = countFlags(row, col);
    if (flags === grid[row][col].objVal) {
      if (row != 0) {
        if (col != 0) {
          openBox(row - 1, col - 1);
        }
        openBox(row - 1, col);
        if (col != maxCol - 1) {
          openBox(row - 1, col + 1);
        }
      }

      if (col != 0) {
        openBox(row, col - 1);
      }
      if (col != maxCol - 1) {
        openBox(row, col + 1);
      }

      if (row != maxRow - 1) {
        if (col != 0) {
          openBox(row + 1, col - 1);
        }
        openBox(row + 1, col);
        if (col != maxCol - 1) {
          openBox(row + 1, col + 1);
        }
      }
    } else {
      highlightSurrounding(row, col);
    }
  }

  function highlightSurrounding(row, col) {
    const temp = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    Object.assign(temp, grid);
    if (row != 0) {
      if (col != 0) {
        if (temp[row - 1][col - 1].objState === "closed") {
          temp[row - 1][col - 1].objState = "highlight";
        }
      }
      if (temp[row - 1][col].objState === "closed") {
        temp[row - 1][col].objState = "highlight";
      }
      if (col != maxCol - 1) {
        if (temp[row - 1][col + 1].objState === "closed") {
          temp[row - 1][col + 1].objState = "highlight";
        }
      }
    }

    if (col != 0) {
      if (temp[row][col - 1].objState === "closed") {
        temp[row][col - 1].objState = "highlight";
      }
    }
    if (col != maxCol - 1) {
      if (temp[row][col + 1].objState === "closed") {
        temp[row][col + 1].objState = "highlight";
      }
    }

    if (row != maxRow - 1) {
      if (col != 0) {
        if (temp[row + 1][col - 1].objState === "closed") {
          temp[row + 1][col - 1].objState = "highlight";
        }
      }
      if (temp[row + 1][col].objState === "closed") {
        temp[row + 1][col].objState = "highlight";
      }
      if (col != maxCol - 1) {
        if (temp[row + 1][col + 1].objState === "closed") {
          temp[row + 1][col + 1].objState = "highlight";
        }
      }
    }
    setGrid(temp);
    setHighlight(true);
  }

  function removeHighlights() {
    const temp = Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill(undefined));
    Object.assign(temp, grid);
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        if (temp[i][j].objState === "highlight") {
          temp[i][j].objState = "closed";
        }
      }
    }
    setGrid(temp);
  }

  useEffect(() => {
    if (countTotalFlags()) {
      alert("You Win");
      boardReset();
    }
    if (highlight) {
      removeHighlights();
      setHighlight(false);
    }
    if (lose) {
      alert("you Lose");
      boardReset();
      setLose(false);
    }
  }, [grid]);

  const gridStyle = {
    display: "grid",
    height: height + "px",
    width: width + "px",
    alignItems: "center",
    gridTemplateColumns: "repeat(" + maxCol + ", " + width / maxCol + "px)",
    gridTemplateRows: "repeat(" + maxRow + ", " + height / maxRow + "px)",
    border: "2px solid black",
  };

  const GridCSSWrap = styled.section`
    display: grid;
    height: ${height}px;
    width: ${width}px;
    align-items: center;
    grid-template-columns: repeat(${maxCol}, ${width / maxCol}px);
    grid-template-rows: repeat(${maxRow}, ${height / maxRow}px);
    border-left: 4px solid #848484;
    border-top: 4px solid #848484;
    border-right: 4px solid #ffffff;
    border-bottom: 4px solid #ffffff;
  `;

  const BackBoardWrap = styled.section`
    display: flex;
    height: ${height * 1.2}px;
    width: ${width + 20}px;
    padding-bottom: 4px;
    justify-content: center;
    align-items: flex-end;
    background-color: #c6c6c6;
    border-left: 4px solid #ffffff;
    border-top: 4px solid #ffffff;
    border-right: 4px solid #808080;
    border-bottom: 4px solid #808080;
  `;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <BackBoardWrap>
        <BackBoard>
          <Timer />
          <Smile />
          <GridCSSWrap>
            {Object.values(grid).map((row, index) => {
              return Object.values(row).map((cell, col) => {
                return (
                  <Cell
                    obj={cell}
                    height={height / maxRow}
                    width={width / maxCol}
                    openAllZero={openAllZero}
                    flagSquare={flagSquare}
                    openBox={openBox}
                    boardReset={boardReset}
                    clearOrHighlight={clearOrHighlight}
                    key={"row:" + index + " col:" + col}
                  />
                );
              });
            })}
          </GridCSSWrap>
        </BackBoard>
      </BackBoardWrap>
    </div>
  );
}

function BackBoard({ children }) {
  return (
    <>
      <div className="BackBoard">{children}</div>
    </>
  );
}

function Timer() {
  return <></>;
}

function Smile() {
  const SmileyWrap = styled.image`
    display: flex;
    height: 30px;
    width: 30px;
  `;

  return (
    <SmileyWrap>
      <img src={SmileyFace} />
    </SmileyWrap>
  );
}
