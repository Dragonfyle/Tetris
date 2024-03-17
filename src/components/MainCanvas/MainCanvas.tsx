import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainCanvasProps } from "./MainCanvas.types";

export default function MainCanvas({
  isGameOver,
  setIsGameOver,
  score,
  numRowsFilled,
  setNumRowsFilled,
}: MainCanvasProps) {
  return (
    <P.Wrapper>
      <LeftUI score={score} />
      <GameBoard
        numRowsFilled={numRowsFilled}
        isGameOver={isGameOver}
        setNumRowsFilled={setNumRowsFilled}
        setIsGameOver={setIsGameOver}
      ></GameBoard>
      <RightUI />
    </P.Wrapper>
  );
}
