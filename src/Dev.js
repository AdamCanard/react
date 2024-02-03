import { useState, useEffect, useCallback } from "react";
import Gameloop from "./WIP/Gameloop";
import Board from "./Board";

export default function Dev() {
  return (
    // <Gameloop />
    <>
      <Minesweeper />
    </>
  );
}

function Minesweeper() {
  return <Board maxRow={10} maxCol={10} bombs={10} />;
}
