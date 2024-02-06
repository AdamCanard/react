import { useState, useEffect, useCallback } from "react";
import flag from "./Flag.png";

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
    height: height + "px",
    width: width + "px",
    flexWrap: "wrap",
    border: "black 1px solid",
    fontFamily: "Lucida Console",
    fontSize: height / 2.5 + "px",
    userSelect: "none",
    backgroundColor:
      obj.objState === "closed" || obj.objState === "flagged"
        ? "grey"
        : obj.objState === "highlight"
        ? "silver"
        : "lightgrey",
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
  );
}
