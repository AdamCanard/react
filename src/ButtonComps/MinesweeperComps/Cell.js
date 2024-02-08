import { useState, useEffect, useCallback } from "react";
import flag from "./MinesweeperImages/Flag.png";
import styled from "styled-components";
import imgList from "./MineNum";

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
  const numStyle = {
    display: "flex",
    placeContent: "center",
    textAlign: "center",
    height: height + "px",
    width: width + "px",
    flexWrap: "wrap",
    fontFamily: "Lucida Console",
    fontSize: height / 2.5 + "px",
    userSelect: "none",
  };

  const boxStyle = {
    display: "flex",
    placeContent: "center",
    textAlign: "center",
    justifyContent: "flex-start",
    height: height + "px",
    width: width + "px",
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
  return (
    <CellWrap $objState={obj.objState}>
      <div onClick={clickBox} onContextMenu={clickBox} style={boxStyle}>
        {obj.objState === "show" ? (
          obj.objVal === 9 ? (
            <img
              src={imgList[obj.objVal - 1]}
              alt="numImg"
              style={numStyle}
            ></img>
          ) : (
            <img
              src={imgList[obj.objVal - 1]}
              alt="numImg"
              style={numStyle}
            ></img>
          )
        ) : (
          ""
        )}

        {obj.objState === "flagged" ? (
          <img src={flag} alt="flag" style={boxStyle}></img>
        ) : (
          ""
        )}
      </div>
    </CellWrap>
  );
}

const CellWrap = styled.section`
  background-color: ${(props) =>
    props.$objState === "closed" || props.$objState === "flagged"
      ? "#c6c6c6"
      : props.obj === "highlight"
      ? "white"
      : "#b9b9b9"};
  border-left: ${(props) =>
    props.$objState === "closed" || props.$objState === "flagged"
      ? "3px solid #ffffff"
      : "1px solid #848484"};
  border-top: ${(props) =>
    props.$objState === "closed" || props.$objState === "flagged"
      ? "3px solid #ffffff"
      : "1px solid #848484"};
  border-right: ${(props) =>
    props.$objState === "closed" || props.$objState === "flagged"
      ? "3px solid #808080"
      : "1px solid #848484"};
  border-bottom: ${(props) =>
    props.$objState === "closed" || props.$objState === "flagged"
      ? "3px solid #808080"
      : "1px solid #848484"};
`;
