import * as P from "./MainCanvas.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";

export default function MainCanvas() {
  return (
    <P.Wrapper>
      <LeftUI />
      <GameBoard></GameBoard>
      <RightUI />
    </P.Wrapper>
  );
}
