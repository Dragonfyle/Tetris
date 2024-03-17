import { useState } from "react";
import { GlobalStyles } from "$styles/GlobalStyles";
import MainCanvas from "$components/MainCanvas/MainCanvas";
import { calculateScore } from "$utils/score";

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [numRowsFilled, setNumRowsFilled] = useState(0);

  const score = calculateScore(numRowsFilled);

  return (
    <>
      <GlobalStyles />
      <MainCanvas
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        score={score}
        numRowsFilled={numRowsFilled}
        setNumRowsFilled={setNumRowsFilled}
      ></MainCanvas>
    </>
  );
}

export default App;
