import HighScores from "$components/HighScores/HighScores";
import UI from "$components/UI/UI";
import { RightUIPorps } from "./RightUI.types";

export default function RightUI({ highScores }: RightUIPorps) {
  return (
    <UI justify="center">
      <HighScores highScores={highScores} />
    </UI>
  );
}
