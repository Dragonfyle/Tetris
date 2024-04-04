import { useEffect, useRef, useCallback } from "react";
import { moveBlockByOne } from "$utils/block/block";
import { useAppDispatch, useAppSelector } from "$utils/typedReduxHooks";
import {
  getNextBlock,
  resetHookLocation,
  selectBlock,
  updateHookLocation,
} from "$store/blockSlice";
import { selectIsRunning } from "$store/runningSlice";
import { selectFallInterval } from "$store/fallIntervalSlice";
import { BlockVectors } from "$types/globalTypes";
import { handleBlockSettle } from "$utils/handleBlockSettle";
import { selectMatrix } from "$store/matrixSlice";
import { isOnBoard } from "$components/GameBoard/GameBoard.utils";

interface FallingBlockProps {
  canMoveDown: boolean;
  blockVectors: BlockVectors;
  onGameOver: () => void;
}

const MIN_INTERVAL = 0;

export default function useFallingBlock({
  canMoveDown,
  blockVectors,
  onGameOver,
}: FallingBlockProps) {
  const { isRunning } = useAppSelector((state) => selectIsRunning(state));
  const {
    currentBlock: { hookLocation },
  } = useAppSelector((state) => selectBlock(state));
  const { fallInterval } = useAppSelector((state) => selectFallInterval(state));
  const { staticMatrix } = useAppSelector((state) => selectMatrix(state));
  const { currentBlock } = useAppSelector((state) => selectBlock(state));
  const dispatch = useAppDispatch();

  const passedIntervalTime = useRef(0);
  const intervalStartTimestamp = useRef(0);
  const fallRef = useRef<undefined | number>(undefined);

  const handleEndFall = useCallback(
    (blockVectors: BlockVectors) => {
      handleBlockSettle({
        blockVectors,
        staticMatrix,
        colorCode: currentBlock.definition.colorCode,
        dispatch,
      });
      dispatch(getNextBlock());
      dispatch(resetHookLocation());
    },
    [dispatch, currentBlock.definition.colorCode, staticMatrix]
  );

  const handleFall = useCallback(
    function handleFall() {
      fallRef.current = window.setInterval(() => {
        intervalStartTimestamp.current = Date.now();

        if (canMoveDown) {
          dispatch(updateHookLocation(moveBlockByOne(hookLocation, "down")));
        } else {
          const isGameOver = blockVectors.some(([y, x]) => !isOnBoard([y, x]));

          if (isGameOver) {
            onGameOver();
            clearInterval(fallRef.current);
          } else {
            handleEndFall(blockVectors);
          }
        }
      }, Math.max(MIN_INTERVAL, fallInterval - passedIntervalTime.current));
    },
    [
      canMoveDown,
      fallInterval,
      blockVectors,
      handleEndFall,
      dispatch,
      hookLocation,
      onGameOver,
    ]
  );

  useEffect(() => {
    if (!isRunning) return;

    handleFall();

    return () => {
      passedIntervalTime.current = Date.now() - intervalStartTimestamp.current;
      clearInterval(fallRef.current);
    };
  }, [fallRef, fallInterval, handleFall, isRunning]);
}
