import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainCanvasProps } from "./MainCanvas.types";
import { useEffect, useRef, useState } from "react";
import getRenderableBlock from "$utils/getRandomBlock";
import { renderableBlockList } from "$utils/block/block";
import {
  DocumentData,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

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
  console.log(nextBlock.colorCode);
  const db = useRef(getFirestore());

  function updateScores(newScores: DocumentData | undefined) {
    if (!newScores) return;

    const values: number[] = Object.values(newScores);
    setHighScores(values);
  }

  useEffect(() => {
    const scoresRef = doc(db.current, "highScores", "top10");
    const unsub = onSnapshot(scoresRef, (doc) => {
      updateScores(doc.data());
    });

    // async function fetchScores() {
    //   try {
    //     const response = await readScoresFromFirebase();
    //     const scores = Object.values(response);

    //     setHighScores(scores);
    //   } catch (error) {
    //     console.error("Error fetching scores:", error);
    //   }
    // }

    // fetchScores();

    return () => unsub();
  }, []);
  console.log(nextBlock.colorCode);

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
        />
        <RightUI highScores={highScores} />
      </P.ContentWrapper>
    </P.Canvas>
  );
}
