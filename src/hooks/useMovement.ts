import { useCallback, useEffect, useMemo, useState } from "react";
import { moveBlockByOne } from "$utils/block/block";
import {
  ARROW_DOWN_SPEEDUP_FACTOR,
  DEFAULT_SPEEDUP_FACTOR,
  INITIAL_INTERVAL,
} from "$config/initialSettings";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { selectBlock, updateHookLocation } from "$store/blockSlice";
import { selectIsRunning } from "$store/runningSlice";
import { updateFallInterval } from "$store/fallIntervalSlice";
import { calculateFallInterval } from "$components/GameBoard/GameBoard.utils";
import { selectRowsFilled } from "$store/rowsFilledSlice";
import { ARROW_KEYS } from "src/constants/constants";

interface useMovementProps {
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

export default function useMovement({
  canMoveLeft,
  canMoveRight,
}: useMovementProps) {
  const { isRunning } = useAppSelector(selectIsRunning);
  const {
    currentBlock: { hookLocation },
  } = useAppSelector(selectBlock);
  const { numRowsFilled } = useAppSelector(selectRowsFilled);
  const dispatch = useAppDispatch();
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
      const isKeySupported = e.key in ARROW_KEYS;

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
        case ARROW_KEYS.ARROW_LEFT:
          handleLeft();
          break;
        case ARROW_KEYS.ARROW_RIGHT:
          handleRight();
          break;
        case ARROW_KEYS.ARROW_DOWN:
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

//TODO prettier
