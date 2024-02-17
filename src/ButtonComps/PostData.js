import Clock from "./Clock";
import Minesweeper from "../routes/Minesweeper/Minesweeper";

const clockPara = `I made this clock to practice using hooks, specifically useState and useInterval. 
  I was inspired to make this clock from a mock-up I saw on instagram and i wanted to try and recreate it.
  \n
  Left to do is Style it better and replace the sizing with rem instead of px`;

const minePara = `I have always loved minesweeper and thought it would be a good test of skill. 
This project helped me to structure my componants better, it also helped me learn better use cases for UseEffect.
It gave me a lot more practice managing state from parent and child componants. 
Im really happy with the logic, i am not so happy with all the redundant if statements i have in my logic
\n
Left to do is 
styling to set numbers to be minesweeper photos,
I need to implement timer and bombs, then fix the smile photo 
I want to render the flag or click on win and loss before running the alert and maybe find a better way to highlight blocks`;

const postPara = `I am making the homepage / post system to keep a ledger of the things im working on, this post is specific is to see how the scroll it.
I want to make everyother post to be in the reverse direction, I want to move all the paragraphs to a data file.
This is the start of css monthlys, I'm only going to work on styles at the start of each month
I need to fix the home page to allow dynamic sized components, next to do is a post adder
`;

let paraList = {
  Post: postPara,
  Minesweeper: minePara,
  Clock: clockPara,
};

export default paraList;
