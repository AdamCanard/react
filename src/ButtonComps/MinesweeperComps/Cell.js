import { useState, useEffect, useCallback } from "react";
import flag from "./MinesweeperImages/Flag.png";
import styled from "styled-components";

export default function Cell({
  obj,
  height,
  width,
  openAllZero,
  flagSquare,
  openBox,
  boardReset,
  clearOrHighlight,
}) {
  const boxStyle = {
    display: "flex",
    placeContent: "center",
    textAlign: "center",
    height: height - 3 + "px",
    width: width - 3 + "px",
    flexWrap: "wrap",
    fontFamily: "Lucida Console",
    fontSize: height / 2.5 + "px",
    userSelect: "none",
  };

  function clickBox(e) {
    if (e.type === "click") {
      if (obj.objState === "closed") {
        if (obj.objVal === 0) {
          openAllZero(obj.objRow, obj.objCol);
        } else if (obj.objVal === "B") {
          alert("you lose");
          boardReset();
        } else {
          openBox(obj.objRow, obj.objCol);
        }
      } else if (obj.objState === "show" && obj.objVal != 9) {
        clearOrHighlight(obj.objRow, obj.objCol);
      }
    } else if (e.type === "contextmenu") {
      if (obj.objState === "closed" || obj.objState === "flagged") {
        flagSquare(obj.objRow, obj.objCol);
      }
    }
  }

  const CellWrap = styled.section`
    background-color: ${obj.objState === "closed" || obj.objState === "flagged"
      ? "#c6c6c6"
      : obj.objState === "highlight"
      ? "white"
      : "#b9b9b9"};
    border-left: ${obj.objState === "closed" || obj.objState === "flagged"
      ? "3px solid #ffffff"
      : "1px solid #848484"};
    border-top: ${obj.objState === "closed" || obj.objState === "flagged"
      ? "3px solid #ffffff"
      : "1px solid #848484"};
    border-right: ${obj.objState === "closed" || obj.objState === "flagged"
      ? "3px solid #808080"
      : "1px solid #848484"};
    border-bottom: ${obj.objState === "closed" || obj.objState === "flagged"
      ? "3px solid #808080"
      : "1px solid #848484"};
  `;

  return (
    <CellWrap>
      <div onClick={clickBox} onContextMenu={clickBox} style={boxStyle}>
        {obj.objState === "show" && obj.objState != "flagged"
          ? obj.objVal === 9
            ? ""
            : obj.objVal
          : ""}

        {obj.objState === "flagged" ? (
          <img src={flag} alt="flag" style={boxStyle}></img>
        ) : (
          ""
        )}
      </div>
    </CellWrap>
  );
}
