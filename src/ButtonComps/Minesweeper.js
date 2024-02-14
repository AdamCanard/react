import Board from "./MinesweeperComps/Board";

export default function Minesweeper({ difficulty = "easy" }) {
  let rows, cols, bombs, height, width;
  if (difficulty === "easy") {
    rows = 9;
    cols = 9;
    bombs = 10;
    height = 200;
    width = 200;
  } else if (difficulty === "medium") {
    rows = 16;
    cols = 16;
    bombs = 40;
    height = 400;
    width = 400;
  } else if (difficulty === "hard") {
    rows = 16;
    cols = 30;
    bombs = 99;
    height = 400;
    width = 800;
  } else {
    console.log("custom");
  }

  return (
    <Board
      maxRow={rows}
      maxCol={cols}
      bombs={bombs}
      height={height}
      width={width}
      difficulty={difficulty}
    />
  );
}
