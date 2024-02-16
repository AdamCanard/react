import { useState, useEffect, useRef, createContext, useContext } from "react";
import Cell from "./Cell.js";
import SmileyFace from "./MinesweeperImages/Smiley.png";
import Timer from "./Timer.js";
import styled from "styled-components";
import FlagCounter from "./FlagCounter.js";

export const ValContext = createContext(null);

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
  const [numFlags, setNumFlags] = useState(0);
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
    setNumFlags(flagCount);
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

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <ValContext.Provider value={{ bombs, numFlags }}>
        <BackBoardWrap>
          <TopRow width={width} />
          <GridCSSWrap
            $height={height + 5}
            $width={width + 5}
            $maxcol={maxCol}
            $maxrow={maxRow}
          >
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
        </BackBoardWrap>
      </ValContext.Provider>
    </div>
  );
}

const BackBoardWrap = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 6px;
  background-color: #c6c6c6;
  border-left: 4px solid #ffffff;
  border-top: 4px solid #ffffff;
  border-right: 4px solid #808080;
  border-bottom: 4px solid #808080;
  row-gap: 8px;
`;

const GridCSSWrap = styled.section`
  display: grid;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  grid-template-columns: repeat(
    ${(props) => props.$maxcol},
    ${(props) => props.$width / props.$maxcol}px
  );
  grid-template-rows: repeat(
    ${(props) => props.$maxrow},
    ${(props) => props.$height / props.$maxrow}px
  );
  border-left: 4px solid #848484;
  border-top: 4px solid #848484;
  border-right: 4px solid #ffffff;
  border-bottom: 4px solid #ffffff;
`;

const TopRowWrap = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => props.$width}px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  background-color: #c0c0c0;
  border-left: 4px solid #808080;
  border-top: 4px solid #808080;
  border-right: 4px solid #ffffff;
  border-bottom: 4px solid #ffffff;
`;

const SevenSegWrap = styled.section`
  height: 30px;
  width: 60px;
  background-color: black;
  border-left: 2px solid #848484;
  border-top: 2px solid #848484;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
`;

function TopRow({ width }) {
  return (
    <>
      <TopRowWrap $width={width}>
        <SevenSegWrap>
          <FlagCounter />
        </SevenSegWrap>
        <SmileyWrap>
          <img src={SmileyFace} />
        </SmileyWrap>
        <SevenSegWrap>
          <Timer />
        </SevenSegWrap>
      </TopRowWrap>
    </>
  );
}

const SmileyWrap = styled.section`
  display: flex;
  height: 30px;
  width: 30px;
  justify-self: center;
  border-left: 2px solid #ffffff;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #848484;
  border-bottom: 2px solid #848484;
`;
