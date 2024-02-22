import { useCallback, useEffect, useState } from "react";
import { moveBlockByOne } from "$utils/block/block";
import { Vector } from "$types/typeCollection";
import { INITIAL_INTERVAL } from "$config/initialSettings";

interface useMovementProps {
  setHookLocation: React.Dispatch<React.SetStateAction<Vector>>;
  setFallInterval: React.Dispatch<React.SetStateAction<number>>;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

export default function useMovement({
  setHookLocation,
  setFallInterval,
  canMoveLeft,
  canMoveRight,
}: useMovementProps) {
  const [isDown, setIsDown] = useState(false);

  const keyboardListener = useCallback(
    (e: KeyboardEvent) => {
      const supportedKeys = {
        ARROW_DOWN: "ArrowDown",
        ARROW_LEFT: "ArrowLeft",
        ARROW_RIGHT: "ArrowRight",
      };
      const isKeySupported = Object.values(supportedKeys).includes(e.key);

      function handleLeft() {
        if (canMoveLeft && e.type === "keydown") {
          moveBlockByOne(setHookLocation, "left");
        }
      }

      function handleRight() {
        if (canMoveRight && e.type === "keydown") {
          moveBlockByOne(setHookLocation, "right");
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
          setFallInterval(INITIAL_INTERVAL);
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
    [setHookLocation, setFallInterval, isDown, canMoveLeft, canMoveRight]
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
