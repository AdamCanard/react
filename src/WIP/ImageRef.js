import { useCallback, useState } from "react";

export default function ImageRef({ src, alt }) {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const div = useCallback((node) => {
    if (node != null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  });

  return (
    <div ref={div}>
      <img src={src} alt={alt} height={height} width={width} />
    </div>
  );
}
