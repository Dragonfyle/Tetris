import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainCanvasProps } from "./MainCanvas.types";

export default function MainCanvas({ score }: MainCanvasProps) {
  return (
    <P.Canvas>
      <P.ContentWrapper>
        <LeftUI score={score} />
        <GameBoard score={score} />
        <RightUI />
      </P.ContentWrapper>
    </P.Canvas>
  );
}
