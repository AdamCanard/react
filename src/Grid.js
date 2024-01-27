import { Children } from "react";

export default function Grid({ children, col, row, height, width }) {
  const childHeight = height / row;
  const childWidth = width / col;
  const totalChildren = row * col;

  const styles = {
    display: "grid",
    height: height + "px",
    width: width + "px",
    alignItems: "center",
    gridTemplateColumns: "repeat(" + col + ", " + childWidth + "px)",
    gridTemplateRows: "repeat(" + row + ", " + childHeight + "px)",
  };

  //Makes sure you dont have too many children
  if (Children.count(children) <= totalChildren) {
    //create clones of all the children
    //console.log(children);
    const clones = Children.map(children, (child) => (
      //add a border to each child
      <div
      // style={{
      //   border: "1px black solid",
      //   outline: "1px black solid",
      //   outlineOffset: "-2px",
      //   gridArea: child.props.row + "/" + child.props.col,
      //   height: "50px",
      //   width: "50px",
      // }}
      >
        {child}
      </div>
    ));

    //return a div with the grid style, with all the clones inside
    return (
      <div className="grid" style={styles}>
        {clones}
      </div>
    );
    //if you are giving too many children
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
