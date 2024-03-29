import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainCanvasProps } from "./MainCanvas.types";
import { useState } from "react";
import getRenderableBlock from "$utils/getRandomBlock";
import { renderableBlockList } from "$utils/block/block";

export default function MainCanvas({
  score,
  numRowsFilled,
  setNumRowsFilled,
  isRunning,
  setIsRunning,
}: MainCanvasProps) {
  const [nextBlock, setNextBlock] = useState(
    getRenderableBlock(renderableBlockList)
  );

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
        ></GameBoard>
        <RightUI />
      </P.ContentWrapper>
    </P.Canvas>
  );
}
