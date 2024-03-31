import { useState } from "react";
import { GlobalStyles } from "$styles/GlobalStyles";
import MainCanvas from "$components/MainCanvas/MainCanvas";
import { calculateScore } from "$utils/score";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [numRowsFilled, setNumRowsFilled] = useState(0);
  const score = calculateScore(numRowsFilled);

  return (
    <>
      <GlobalStyles />
      <MainCanvas
        score={score}
        numRowsFilled={numRowsFilled}
        setNumRowsFilled={setNumRowsFilled}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      ></MainCanvas>
    </>
  );
}

export default App;
