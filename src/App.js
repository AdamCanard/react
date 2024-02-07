import styled from "styled-components";
import Screen from "./Screen";

const flexStyleCenter = {
  display: "flex",
  width: "100%",
  height: "100vh",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  position: "relative",
};

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
      <Screen />
    </AppWrap>
  );
}
export default App;
