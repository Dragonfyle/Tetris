import * as P from "./Square.parts";
import { SquareProps } from "./Square.types";

export default function Square({ colorCode }: SquareProps) {
  return <P.Square $colorCode={colorCode} />;
}
