import Clock from "./Clock";

export default function Homepage() {
  return <Post name={"Clock"} comp={<Clock />} />;
}

function Post({ name, comp }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "70rem",
        height: "15rem",
        border: "2px solid black",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div>{comp}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          border: "2px solid black",
          textAlign: "left",
          gap: "10px",
        }}
      >
        <h2
          style={{
            border: "2px solid black",
            margin: "10px 10px 0px 10px",
            fontSize: "30px",
          }}
        >
          {name}
        </h2>
        <p style={{ border: "2px solid black", margin: "10px 10px 10px 10px" }}>
          I made this clock to practice using hooks, specifically useState and
          useInterval. I was inspired to make this clock from a mock-up I saw on
          instagram and i wanted to try and recreate it.
        </p>
      </div>
    </div>
  );
}
