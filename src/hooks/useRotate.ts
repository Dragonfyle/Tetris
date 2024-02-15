import { useCallback, useEffect, useState } from "react";
import { getNextRotation } from "../utils/block/block";
import { BlockCoords } from "../types/globalTypes";

interface useRotateProps {
  onKeyDown: React.Dispatch<React.SetStateAction<BlockCoords>>;
}

export default function useKeyboardMovement({ onKeyDown }: useRotateProps) {
  const [isDown, setIsDown] = useState(false);

  const keyboardListener = useCallback(
    (e: KeyboardEvent) => {
      const supportedKeys = {
        SPACE: " ",
      };
      const isKeySupported = Object.keys(supportedKeys).includes(e.key);

      function handleRotate() {
        if (!isDown) {
          setIsDown(true);
          onKeyDown((prev) => getNextRotation(prev));
        }
        if (e.type === "keyup") {
          setIsDown(false);
        }
      }

      if (isKeySupported) {
        e.preventDefault();
        e.stopPropagation();
        handleRotate();
      }
    },
    [onKeyDown, isDown]
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
