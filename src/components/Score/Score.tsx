import * as P from "./Score.parts";

interface ScoreProps {
  children: string;
}

export default function Score({ children }: ScoreProps) {
  return <P.ScoreWrapper>{children}</P.ScoreWrapper>;
}
