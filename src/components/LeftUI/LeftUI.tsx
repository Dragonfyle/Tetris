import UI from "$components/UI/UI";
import Score from "$components/Score/Score";
import { LeftUIProps } from "./LeftUI.types";
import NextBlock from "$components/NextBlock/NextBlock";
import * as P from "./LeftUI.parts";

export default function LeftUI({ score }: LeftUIProps) {
  return (
    <UI justify={"center"}>
      <P.ContentWrapper>
        <Score score={score} />
        <NextBlock />
      </P.ContentWrapper>
    </UI>
  );
}
