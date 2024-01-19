export default function Grid({ children, col, row, height, width }) {
  const childHeight = height / row;
  const childWidth = width / col;
  const totalChildren = row * col;
  const styles = {
    display: "grid",
    height: height + "px",
    width: width + "px",
    gridTemplateColumns: "repeat(" + col + ", " + childWidth + "px)",
    gridTemplateRows: "repeat(" + row + ", " + childHeight + "px)",
  };
  if (children.length <= totalChildren) {
    return (
      <div className="grid" style={styles}>
        {children}
      </div>
    );
  } else {
    return (
      <div
        className="grid"
        style={{ color: "red", fontSize: "25px", fontWeight: "700" }}
      >
        GRID ERROR: Too Many Child Componants
      </div>
    );
  }
}
