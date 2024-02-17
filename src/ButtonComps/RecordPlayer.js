export default function RecordPlayer({ inputPos }) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        backgroundColor: "purple",
        position: "absolute",
        border: "1px solid black",
        userDrag: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: inputPos.z,
        transform: `translate(
          ${inputPos.x}px,
          ${inputPos.y}px
        )`,
      }}
    ></div>
  );
}
