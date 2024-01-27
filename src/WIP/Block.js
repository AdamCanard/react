import { useCallback, useState } from "react";

export default function Block({ xPos, yPos, color }) {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const div = useCallback((node) => {
    if (node != null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  });
  const blockStyle = {
    backgroundColor: color,
    marginTop: yPos + "px",
    marginLeft: xPos + "px",
    height: height + "px",
    width: width + "px",
    position: "absolute",
  };
  return <div ref={div} className="block" style={blockStyle}></div>;
}
