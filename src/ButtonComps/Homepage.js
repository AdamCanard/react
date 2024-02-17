import Clock from "./Clock";
import Minesweeper from "../routes/Minesweeper/Minesweeper";
import Postdata from "./PostData";

export default function Homepage() {
  return (
    <>
      {/* {Object.entries(Postdata).map((obj, index) => {
        console.log(index, obj);
        return <Post name={obj[0]} comp={""} para={obj[1]} />;
      })} */}
      <Post name={"Post"} comp={""} para={Postdata.Post} />
      <Post
        name={"MineSweeper"}
        comp={<Minesweeper height={200} width={225} />}
        para={Postdata.Minesweeper}
      />
      <Post
        name={"Clock"}
        comp={<Clock height={250} width={250} />}
        para={Postdata.Clock}
      />
    </>
  );
}

function Post({ name, comp, para }) {
  return (
    <div
      className="PostDiv"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "72rem",
        height: "16rem",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "1rem",
        background:
          "radial-gradient(crimson, skyblue), linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 1) 90%)",

        rowGap: "1rem",
      }}
    >
      <div
        className="ComponantDiv"
        style={{
          display: "flex",
          width: "16rem",
          height: "16rem",
          justifyContent: "center",
        }}
      >
        {comp}
      </div>
      <div
        className="TextDiv"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "56rem",
          height: "16rem",
          border: "2px solid black",
          textAlign: "left",
          gap: "10px",
        }}
      >
        <h2
          style={{
            margin: "10px 10px 0px 10px",
            fontSize: "30px",
          }}
        >
          {name}
        </h2>
        <p style={{ margin: "10px 10px 10px 10px" }}>{para}</p>
      </div>
    </div>
  );
}
