import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainCanvasProps } from "./MainCanvas.types";
import { useEffect, useState } from "react";
import getRenderableBlock from "$utils/getRandomBlock";
import { renderableBlockList } from "$utils/block/block";
import { readScoresFromFirebase } from "$utils/firebaseReadWrite";

export default function MainCanvas({
  score,
  numRowsFilled,
  setNumRowsFilled,
  isRunning,
  setIsRunning,
}: MainCanvasProps) {
  const [highScores, setHighScores] = useState<number[]>([]);
  const [nextBlock, setNextBlock] = useState(
    getRenderableBlock(renderableBlockList)
  );

  useEffect(() => {
    async function fetchScores() {
      try {
        const scores = await readScoresFromFirebase();
        setHighScores(Object.values(scores));
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    }

    fetchScores();
  });

  return (
    <P.Canvas>
      <P.ContentWrapper>
        <LeftUI score={score} nextBlock={nextBlock} />
        <GameBoard
          numRowsFilled={numRowsFilled}
          setNumRowsFilled={setNumRowsFilled}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          nextBlock={nextBlock}
          setNextBlock={setNextBlock}
          score={score}
        ></GameBoard>
        <RightUI highScores={highScores} />
      </P.ContentWrapper>
    </P.Canvas>
  );
}
