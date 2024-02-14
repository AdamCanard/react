import { useState } from "react";
import styled from "styled-components";

export default function Vinyl() {
  const [shape, setShape] = useState({
    color: "orange",
    position: { x: 0, y: 0 },
  });

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        ...shape.position,
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      },
    });
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value,
    });
  }

  return (
    <>
      <select value={shape.color} onChange={handleColorChange}>
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>

      <Record
        name="temp"
        position={shape.position}
        onMove={handleMove}
      ></Record>
    </>
  );
}

function Record({ name, position, onMove }) {
  const [lastCoordinates, setLastCoordinates] = useState(null);

  function handlePointerDown(e) {
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
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    // <ImageWrapper x={position.x} y={position.y} $backimg={temp}>
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      // src={image}
      alt={name}
      style={{
        width: 100,
        height: 100,
        cursor: "grab",
        backgroundImage: 'url("https://imgur.com/iCKKb0E")',
        position: "absolute",
        border: "1px solid black",
        userDrag: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    />
  );
}

const ImageWrapper = styled.section`
  width: 100px;
  height: 100px;
  cursor: grab;
  position: absolute;
  border: 1px black solid;
  //background-image: url("../Temp.png");
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(${(props) => props.x}px, ${(props) => props.y});
`;
