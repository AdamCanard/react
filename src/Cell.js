import { useState, useEffect, useCallback } from "react";

export default function Cell({ obj, height, width, openAllZero }) {
  const [objState, setObjState] = useState(obj);

  const boxStyle = {
    display: "flex",
    placeContent: "center",
    textAlign: "center",
    height: height + "px",
    width: width + "px",
    flexWrap: "wrap",
    border: "grey 1px solid",
    fontFamily: "Lucida Console",
    fontSize: "50px",
  };

  const showStyle = {
    display: "flex",
    placeContent: "center",
    textAlign: "center",
    height: height + "px",
    width: width + "px",
    flexWrap: "wrap",
    border: "grey 1px solid",
    fontFamily: "Lucida Console",
    fontSize: "50px",
    backgroundColor: "black",
  };

  function clickBox() {
    let tempObj = {};
    Object.assign(tempObj, objState);

    if (objState.objState === "closed") {
      if (objState.objVal === 0) {
        openAllZero(objState.objRow, objState.objCol);
      }
    }
  }
  return (
    <div onClick={clickBox} style={boxStyle}>
      {objState.objState === "show" ? obj.objVal : ""}
    </div>
  );
}
