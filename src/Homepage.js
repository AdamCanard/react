import Clock from "./Clock";
import Minesweeper from "./Minesweeper";

const clockPara = `I made this clock to practice using hooks, specifically useState and useInterval. 
  I was inspired to make this clock from a mock-up I saw oninstagram and i wanted to try and recreate it.
  \n
  Left to do is Style it better and replace the sizing with rem instead of px`;

const minePara = `I have always loved minesweeper and thought it would be a good test of skill. 
This project helped me to structure my componants better, it also helped me learn better use cases for UseEffect.
It gave me a lot more practice managing state from parent and child componants. 
Im really happy with the logic, i am not so happy with all the redundant if statements i have in my logic
\n
Left to do is styling on the parent component to make it look like minesweeper, I want to render the flag or click on win and loss before running the alert and maybe find a better way to highlight blocks`;

export default function Homepage() {
  return (
    <>
      <Post
        name={"Clock"}
        comp={<Clock height={250} width={250} />}
        para={clockPara}
      />
      <Post
        name={"MineSweeper"}
        comp={<Minesweeper height={250} width={250} />}
        para={minePara}
      />
    </>
  );
}

function Post({ name, comp, para }) {
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
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          width: "17.5rem",
          height: "100%",
        }}
      >
        {comp}
      </div>
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
