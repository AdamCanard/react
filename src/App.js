import styled from "styled-components";
import Screen from "./Screen.js";

const AppWrap = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  text-align: center;
  align-items: center;
  position: relative;
`;

function App() {
  return (
    <AppWrap id="AppWrapper">
      <Screen startingScreen={"dev"} />
    </AppWrap>
  );
}
export default App;
