import { BOARD_DIMENSIONS } from "../config/board";
import { useCallback, useEffect, useState } from "react";
import { BlockPositionProps } from "../components/GameBoard/GameBoard";

export default function useKeyboardControls(
  onKeyDown: React.Dispatch<React.SetStateAction<BlockPositionProps>>,
  setFallingInterval: React.Dispatch<React.SetStateAction<number>>
) {
  const [isDown, setIsDown] = useState(false);

  const keyboardListener = useCallback(
    (e: KeyboardEvent) => {
      const supportedKeys = {
        ARROW_DOWN: "ArrowDown",
        ARROW_LEFT: "ArrowLeft",
        ARROW_RIGHT: "ArrowRight",
      };

      const isKeySupported = Object.keys(supportedKeys).includes(e.key);

      function handleLeft() {
        onKeyDown((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
      }

      function handleRight() {
        onKeyDown((prev) => ({
          ...prev,
          x: Math.min(BOARD_DIMENSIONS.WIDTH - 1, prev.x + 1),
        }));
      }

      function handleDown(e: KeyboardEvent) {
        if (e.type === "keydown") {
          if (!isDown) {
            setIsDown(true);
            setFallingInterval((prev) => prev / 10);
          }
        }
        if (e.type === "keyup") {
          setIsDown(false);
          setFallingInterval(1000);
        }
      }

      if (isKeySupported) {
        e.preventDefault();
        e.stopPropagation();
      }

      switch (e.key) {
        case supportedKeys.ARROW_LEFT:
          handleLeft();
          break;
        case supportedKeys.ARROW_RIGHT:
          handleRight();
          break;
        case supportedKeys.ARROW_DOWN:
          handleDown(e);
          break;
      }
    },
    [onKeyDown, setFallingInterval, isDown]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyboardListener);
    window.addEventListener("keyup", keyboardListener);

    return () => {
      window.removeEventListener("keydown", keyboardListener);
      window.removeEventListener("keyup", keyboardListener);
    };
  }, [keyboardListener]);
}
