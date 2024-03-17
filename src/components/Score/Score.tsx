import * as P from "./Score.parts";
import { ScoreProps } from "./Score.types";

export default function Score({ score }: ScoreProps) {
  return <P.ScoreWrapper>{score}</P.ScoreWrapper>;
}
