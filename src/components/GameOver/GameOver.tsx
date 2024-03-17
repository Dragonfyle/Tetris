import { forwardRef } from "react";
import * as P from "./GameOver.parts";

export default forwardRef<HTMLDialogElement>(function GameOver(_, ref) {
  return (
    <P.StyledDialog ref={ref}>
      <span>Game Over</span>
    </P.StyledDialog>
  );
});
