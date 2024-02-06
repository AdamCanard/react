import Board from "./Board";

export default function Minesweeper({ height = 500, width = 500 }) {
  return (
    <Board maxRow={10} maxCol={10} bombs={10} height={height} width={width} />
  );
}
