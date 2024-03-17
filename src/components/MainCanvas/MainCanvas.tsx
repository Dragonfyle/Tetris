import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainCanvasProps } from "./MainCanvas.types";

export default function MainCanvas({
  score,
  numRowsFilled,
  setNumRowsFilled,
}: MainCanvasProps) {
  return (
    <P.Wrapper>
      <LeftUI score={score} />
      <GameBoard
        numRowsFilled={numRowsFilled}
        setNumRowsFilled={setNumRowsFilled}
      ></GameBoard>
      <RightUI />
    </P.Wrapper>
  );
}
