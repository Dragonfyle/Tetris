// import * as P from "./LeftUI.parts";
import UI from "$components/UI/UI";
import Score from "$components/Score/Score";
import { LeftUIProps } from "./LeftUI.types";

export default function LeftUI({ score }: LeftUIProps) {
  return (
    <UI justify={"center"}>
      <Score score={score} />
    </UI>
  );
}
