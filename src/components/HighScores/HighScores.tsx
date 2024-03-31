import { HighScoresProps } from "./HighScores.types";
import * as P from "./HighScores.parts";

export default function HighScores({ highScores }: HighScoresProps) {
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
