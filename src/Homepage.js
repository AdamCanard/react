import Clock from "./Clock";
import Minesweeper from "./Minesweeper";

const clockPara = `I made this clock to practice using hooks, specifically useState and useInterval. 
  I was inspired to make this clock from a mock-up I saw on instagram and i wanted to try and recreate it.
  \n
  Left to do is Style it better and replace the sizing with rem instead of px`;

const minePara = `I have always loved minesweeper and thought it would be a good test of skill. 
This project helped me to structure my componants better, it also helped me learn better use cases for UseEffect.
It gave me a lot more practice managing state from parent and child componants. 
Im really happy with the logic, i am not so happy with all the redundant if statements i have in my logic
\n
Left to do is styling on the parent component to make it look like minesweeper, I want to render the flag or click on win and loss before running the alert and maybe find a better way to highlight blocks`;

const postPara = `I am making the homepage / post system to keep a ledger of the things im working on, this post is specific is to see how the scroll it.
I want to make everyother post to be in the reverse direction, I want to move all the paragraphs to a data file.
This is the start of css monthlys, I'm only going to work on styles at the start of each month
`;

export default function Homepage() {
  return (
    <>
      <Post name={"Post"} comp={""} para={postPara} />
      <Post
        name={"MineSweeper"}
        comp={<Minesweeper height={250} width={250} />}
        para={minePara}
      />
      <Post
        name={"Clock"}
        comp={<Clock height={250} width={250} />}
        para={clockPara}
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
