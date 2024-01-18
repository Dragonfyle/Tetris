// import * as P from "./LeftUI.parts";
import UI from "../UI/UI";
import Score from "../Score/Score";

export default function LeftUI() {
  return (
    <UI justify={"flex-start"}>
      <Score>0</Score>
    </UI>
  );
}
