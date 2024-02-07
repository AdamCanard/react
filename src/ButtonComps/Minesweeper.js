import Board from "./MinesweeperComps/Board";

export default function Minesweeper({ height = 250, width = 250 }) {
  return (
    <Board maxRow={9} maxCol={9} bombs={10} height={height} width={width} />
  );
}
