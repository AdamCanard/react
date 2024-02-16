import Vinyl from "./Vinyl";
import RecordPlayer from "./RecordPlayer";
import styled from "styled-components";
import { useState } from "react";

export default function Room() {
  const recordPlayerPos = {
    x: 0,
    y: 0,
    z: 0,
  };

  function checkPlacement(recordX, recordY) {
    console.log(recordX, recordY);
    if (recordX === recordPlayerPos.x && recordY === recordPlayerPos.y) {
      alert("Placed");
    } else if (
      recordX >= recordPlayerPos.x - 10 &&
      recordX <= recordPlayerPos.x + 10 &&
      recordY >= recordPlayerPos.y - 10 &&
      recordY <= recordPlayerPos.y + 10
    ) {
      console.log("close");
    }
  }

  const fakeRecords = [
    { pos: { x: -200, y: 50, z: 1 }, color: "white" },
    { pos: { x: -200, y: 155, z: 1 }, color: "green" },
    { pos: { x: -200, y: 260, z: 1 }, color: "yellow" },
  ];

  return (
    <>
      {Object.values(fakeRecords).map((obj, index) => {
        //onMove, pop object from list and readd to the end of the list
        // so that when you move something it ends up on top
        return (
          <Vinyl
            inputPos={obj.pos}
            inputColor={obj.color}
            key={index}
            onDrop={checkPlacement}
          />
        );
      })}
      <RecordPlayer inputPos={{ recordPlayerPos }} />
      <Zoom />
    </>
  );
}

function Zoom() {
  return (
    <ZoomScreenWrap>
      <>
        <Record inputPos={{ x: 0, y: 0, z: 10 }} />
        <Spike />
      </>
    </ZoomScreenWrap>
  );
}

const ZoomScreenWrap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  height: 200px;
  width: 400px;
  z-index: 10;
  overflow: hidden;
  border: 4px black solid;
  transform: translate(${0}px, ${150}px);
`;

function Record(inputPos) {
  const [position, setPosition] = useState({
    x: inputPos.inputPos.x,
    y: inputPos.inputPos.y,
    z: inputPos.inputPos.z,
  });

  const [lastCoordinates, setLastCoordinates] = useState(null);

  function handleMove(dx, dy) {
    setPosition({
      ...position,
      x: position.x + dx,
      y: position.y + dy,
    });
  }

  function handlePointerDown(e) {
    console.log(position);
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      handleMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
    //snap box on drop to whole pixel
    setPosition({
      ...position,
      x: Math.floor(position.x),
      y: Math.floor(position.y),
    });
  }
  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
        position: "absolute",
        width: "800px",
        height: "30px",
        backgroundColor: "black",
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >
      <div
        style={{ height: "30px", width: "30px", backgroundColor: "green" }}
      ></div>
    </div>
  );
}

function Spike() {
  return (
    <div
      style={{
        position: "absolute",
        width: "30px",
        height: "60px",
        zIndex: 11,
        backgroundColor: "blue",
        alignSelf: "end",
      }}
    ></div>
  );
}
