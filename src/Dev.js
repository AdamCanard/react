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
  return <Board row={5} col={5} bombs={5} />;
}
