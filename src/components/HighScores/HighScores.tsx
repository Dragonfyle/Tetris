import useLiveHighScores from "$hooks/useLiveHighScores";
import { selectHighScores } from "$store/highScoresSlice";
import { useAppSelector } from "$utils/typedReduxHooks";
import * as P from "./HighScores.parts";

export default function HighScores() {
  useLiveHighScores();
  const { highScores } = useAppSelector((state) => selectHighScores(state));

  function renderHighScores(highScores: number[]) {
    return highScores.map((score) => <li>{score}</li>);
  }

  return (
    <P.HighScoreWrapper>
      <p>High Scores</p>
      <ul>{...renderHighScores(highScores)}</ul>
    </P.HighScoreWrapper>
  );
}
