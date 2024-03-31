import UI from "$components/UI/UI";
import Score from "$components/Score/Score";
import { LeftUIProps } from "./LeftUI.types";
import NextBlock from "$components/NextBlock/NextBlock";
import { INITIAL_ROTATION_IDX } from "$utils/block/block";
import * as P from "./LeftUI.parts";

export default function LeftUI({ score, nextBlock }: LeftUIProps) {
  console.log(nextBlock.colorCode);

  return (
    <UI justify={"center"}>
      <P.ContentWrapper>
        <Score score={score} />
        <NextBlock
          nextBlockVectors={nextBlock.rotations[INITIAL_ROTATION_IDX]}
          colorCode={nextBlock.colorCode}
        />
      </P.ContentWrapper>
    </UI>
  );
}
