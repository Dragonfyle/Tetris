// import * as P from "./LeftUI.parts";
import UI from "$components/UI/UI";
import Score from "$components/Score/Score";

export default function LeftUI() {
  return (
    <UI justify={"flex-start"}>
      <Score>0</Score>
    </UI>
  );
}
