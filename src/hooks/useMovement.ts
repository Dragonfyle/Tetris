import { useCallback, useEffect, useState } from "react";
import { moveBlockByOne } from "$utils/block/block";
import { Vector } from "$types/typeCollection";
import {
  ARROW_DOWN_SPEEDUP_FACTOR,
  DEFAULT_SPEEDUP_FACTOR,
} from "$config/initialSettings";

interface useMovementProps {
  setHookLocation: React.Dispatch<React.SetStateAction<Vector>>;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  isGameOver: boolean;
}

export default function useMovement({
  setHookLocation,
  canMoveLeft,
  canMoveRight,
  isGameOver,
}: useMovementProps) {
  const [speedupFactor, setSpeedupFactor] = useState(DEFAULT_SPEEDUP_FACTOR);
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
            setSpeedupFactor(ARROW_DOWN_SPEEDUP_FACTOR);
          }
        }
        if (e.type === "keyup") {
          setIsDown(false);
          setSpeedupFactor(DEFAULT_SPEEDUP_FACTOR);
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
    [setHookLocation, isDown, canMoveLeft, canMoveRight]
  );

  useEffect(() => {
    if (isGameOver) return;

    window.addEventListener("keydown", keyboardListener);
    window.addEventListener("keyup", keyboardListener);

    return () => {
      window.removeEventListener("keydown", keyboardListener);
      window.removeEventListener("keyup", keyboardListener);
    };
  }, [keyboardListener, isGameOver]);

  return speedupFactor;
}
