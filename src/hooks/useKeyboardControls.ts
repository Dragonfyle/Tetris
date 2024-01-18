import { useCallback, useEffect, useState } from "react";
import { BlockPositionProps } from "../components/GameBoard/GameBoard";

interface KeyboardControsProps {
  onKeyDown: React.Dispatch<React.SetStateAction<BlockPositionProps>>;
  setFallInterval: React.Dispatch<React.SetStateAction<number>>;
  isBlockedLeft: boolean;
  isBlockedRight: boolean;
}

export default function useKeyboardControls({
  onKeyDown,
  setFallInterval,
  isBlockedLeft,
  isBlockedRight,
}: KeyboardControsProps) {
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
        if (isBlockedLeft) return;

        if (e.type === "keydown") {
          onKeyDown((prev) => ({ ...prev, x: prev.x - 1 }));
        }
      }

      function handleRight() {
        if (isBlockedRight) return;

        if (e.type === "keydown") {
          onKeyDown((prev) => ({
            ...prev,
            x: prev.x + 1,
          }));
        }
      }

      function handleDown() {
        if (e.type === "keydown") {
          if (!isDown) {
            setIsDown(true);
            setFallInterval((prev) => prev / 20);
          }
        }
        if (e.type === "keyup") {
          setIsDown(false);
          setFallInterval(1000);
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
          handleDown();
          break;
      }
    },
    [onKeyDown, setFallInterval, isDown, isBlockedLeft, isBlockedRight]
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
