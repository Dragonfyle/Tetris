import * as P from "./Square.parts";
import { SquareProps } from "./Square.types";

export default function Square({ filled }: SquareProps) {
  return <P.Square $filled={filled} />;
}
