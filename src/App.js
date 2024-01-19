import "./styles.css";
import Player from "./Player.js";
import ImageRef from "./ImageRef.js";
import photo from "./Temp.png";
import Grid from "./Grid.js";

function App() {
  return (
    <>
      <div className="main">
        <Grid col={1} row={3} height={500} width={500}>
          <ImageRef src={photo} alt="image1" />
          <ImageRef src={photo} alt="image2" />
          <ImageRef src={photo} alt="image3" />
        </Grid>
      </div>
    </>
  );
}
export default App;
