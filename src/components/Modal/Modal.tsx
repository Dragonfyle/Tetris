import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./Modal.types";
import * as P from "./Modal.parts";

export default forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  props,
  ref
) {
  const { isFirstGame } = props;

  return createPortal(
    <P.StyledDialog ref={ref}>
      <P.TextWrapper>
        {!isFirstGame && <span>Game Over</span>}
        <span>press space to start</span>
      </P.TextWrapper>
    </P.StyledDialog>,
    document.body
  );
});
