import { useCallback, useEffect } from "react";
import { BlockPositionProps } from "../components/GameBoard/GameBoard";

export default function useKeyboardControls(
  boardWidth,
  boardHeight,
  onKeyDown: React.Dispatch<React.SetStateAction<BlockPositionProps>>
) {
  const keyboardListener = useCallback((e: KeyboardEvent) => {
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
        x: Math.min(boardWidth - 1, prev.x + 1),
      }));
    }

    function handleDown() {
      onKeyDown((prev) => ({
        ...prev,
        y: Math.min(boardHeight - 1, prev.y + 1),
      }));
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
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyboardListener);

    return () => window.removeEventListener("keydown", keyboardListener);
  }, []);
}
