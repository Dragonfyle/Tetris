import { useCallback, useEffect, useMemo, useState } from "react";
import { moveBlockByOne } from "$utils/block/block";
import {
  ARROW_DOWN_SPEEDUP_FACTOR,
  DEFAULT_SPEEDUP_FACTOR,
  INITIAL_INTERVAL,
} from "$config/initialSettings";
import { useAppDispatch, useAppSelector } from "$utils/typedReduxHooks";
import { selectBlock, updateHookLocation } from "$store/blockSlice";
import { selectIsRunning } from "$store/runningSlice";
import { updateFallInterval } from "$store/fallIntervalSlice";
import { calculateFallInterval } from "$components/GameBoard/GameBoard.utils";
import { selectRowsFilled } from "$store/rowsFilledSlice";

interface useMovementProps {
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

export default function useMovement({
  canMoveLeft,
  canMoveRight,
}: useMovementProps) {
  const { isRunning } = useAppSelector((state) => selectIsRunning(state));
  const dispatch = useAppDispatch();
  const {
    currentBlock: { hookLocation },
  } = useAppSelector((state) => selectBlock(state));
  const { numRowsFilled } = useAppSelector((state) => selectRowsFilled(state));
  const [isDown, setIsDown] = useState(false);
  const arrowDownInterval = useMemo(
    () =>
      calculateFallInterval(
        INITIAL_INTERVAL,
        ARROW_DOWN_SPEEDUP_FACTOR,
        numRowsFilled
      ),
    [numRowsFilled]
  );
  const normalInterval = useMemo(
    () =>
      calculateFallInterval(
        INITIAL_INTERVAL,
        DEFAULT_SPEEDUP_FACTOR,
        numRowsFilled
      ),
    [numRowsFilled]
  );

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
          dispatch(updateHookLocation(moveBlockByOne(hookLocation, "left")));
        }
      }

      function handleRight() {
        if (canMoveRight && e.type === "keydown") {
          dispatch(updateHookLocation(moveBlockByOne(hookLocation, "right")));
        }
      }

      function handleDown() {
        if (e.type === "keydown") {
          if (!isDown) {
            setIsDown(true);
            dispatch(updateFallInterval(arrowDownInterval));
          }
        }
        if (e.type === "keyup") {
          setIsDown(false);
          dispatch(updateFallInterval(normalInterval));
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
    [
      isDown,
      canMoveLeft,
      canMoveRight,
      dispatch,
      hookLocation,
      arrowDownInterval,
      normalInterval,
    ]
  );

  useEffect(() => {
    if (!isRunning) return;

    window.addEventListener("keydown", keyboardListener);
    window.addEventListener("keyup", keyboardListener);

    return () => {
      window.removeEventListener("keydown", keyboardListener);
      window.removeEventListener("keyup", keyboardListener);
    };
  }, [keyboardListener, isRunning]);
}
