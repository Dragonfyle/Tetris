import * as P from "./MainView.parts";
import GameBoard from "$components/GameBoard/GameBoard";
import LeftUI from "$components/LeftUI/LeftUI";
import RightUI from "$components/RightUI/RightUI";
import { MainViewProps } from "./MainView.types";
import Controls from "$components/Controls/Controls";

export default function MainView({ score }: MainViewProps) {
  return (
    <P.View>
      <P.ContentWrapper>
        <LeftUI score={score} />
        <GameBoard score={score} />
        <RightUI />
      </P.ContentWrapper>
      <Controls />
    </P.View>
  );
}
