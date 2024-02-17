import { useState, useEffect, useCallback, useReducer } from "react";
import Minesweeper from "../routes/Minesweeper/Minesweeper";
import styled from "styled-components";
import Room from "./Room";

export default function Dev() {
  return (
    // <Gameloop />
    //<Minesweeper />
    // <Box />
    <>
      <Room />
    </>
  );
}

function Box() {
  // const [state, dispatch] = useReducer(reducer, initialState);

  // function handleButtonClick() {
  //   dispatch({ type: "incremented_age" });
  // }

  // function handleInputChange(e) {
  //   dispatch({
  //     type: "changed_name",
  //     nextName: e.target.value,
  //   });
  // }

  // return (
  //   <>
  //     <input value={state.name} onChange={handleInputChange} />
  //     <button onClick={handleButtonClick}>Increment age</button>
  //     <p>
  //       Hello, {state.name}. You are {state.age}.
  //     </p>
  //   </>
  // );
  const [state, dispatch] = useReducer(reducer, { height: 250 });

  function lowerBox() {
    dispatch({ type: "lower-box" });
  }

  return (
    <>
      <div
        style={{
          height: state.height + "px",
          width: "250px",
          backgroundColor: "green",
        }}
      >
        {state.height}
      </div>

      <button onClick={lowerBox}>lowerBox</button>
    </>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "lower-box": {
      return {
        // ...state,
        height: state.height - 1,
      };
    }
  }
  throw Error("bad dispatch");
}
