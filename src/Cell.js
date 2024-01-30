import { useState, useEffect, useCallback } from "react";

export default function Cell({ val, row, col, checkVal, openBox }) {
  const [clicked, setClicked] = useState(false);

  const boxStyle = {
    display: "flex",
    placeContent: "center",
    textAlign: "center",
    height: "100px",
    width: "100px",
    flexWrap: "wrap",
    border: "grey 1px solid",
    fontFamily: "Lucida Console",
    fontSize: "50px",
  };

  function clickBox(row, col) {
    if (!clicked) {
      setClicked(true);
      let val = checkVal(row, col);
      if (val == "B") {
        alert("bomb");
      } else {
        openBox(row, col);
      }
    }
  }

  return (
    <div onClick={() => clickBox(row, col)} style={boxStyle}>
      {val}
    </div>
  );
}
