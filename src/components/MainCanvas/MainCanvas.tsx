import * as P from "./MainCanvas.parts";
import GameBoard from "../GameBoard/GameBoard";
import LeftUI from "../LeftUI/LeftUI";
import RightUI from "../RightUI/RightUI";

export default function MainCanvas() {
  return (
    <P.Wrapper>
      <LeftUI />
      <GameBoard></GameBoard>
      <RightUI />
    </P.Wrapper>
  );
}
