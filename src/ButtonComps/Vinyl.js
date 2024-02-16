import { useState } from "react";
import styled from "styled-components";

export default function Vinyl({ inputPos, inputColor, onDrop }) {
  const [shape, setShape] = useState({
    position: { x: inputPos.x, y: inputPos.y, z: inputPos.z },
    color: inputColor,
  });
  const [lastCoordinates, setLastCoordinates] = useState(null);

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        ...shape.position,
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      },
    });
  }

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
    setShape({
      ...shape,
      position: {
        ...shape.position,
        z: shape.position.z + 1,
      },
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
    setShape({
      ...shape,
      position: {
        ...shape.position,
        x: Math.floor(shape.position.x),
        y: Math.floor(shape.position.y),
        z: shape.position.z - 1,
      },
    });
    onDrop(Math.floor(shape.position.x), Math.floor(shape.position.y));
  }

  return (
    <>
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          width: 100,
          height: 100,
          cursor: "grab",
          backgroundColor: shape.color,
          position: "absolute",
          border: "1px solid black",
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: shape.position.z,
          transform: `translate(
          ${shape.position.x}px,
          ${shape.position.y}px
        )`,
        }}
      >
        {shape.position.x} {"\n"}
        {shape.position.y}
      </div>
    </>
  );
}
