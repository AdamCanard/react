import Board from "./Board";
import styled, { css } from "styled-components";

export default function Minesweeper({ height = 250, width = 250 }) {
  const Wrapper = styled.section`
    box-shadow: outset 1px 1px white;
  `;
  return (
    <Wrapper>
      <Board maxRow={10} maxCol={10} bombs={10} height={height} width={width} />
    </Wrapper>
  );
}

// function Wrapper() {
//   return <></>;
// }
