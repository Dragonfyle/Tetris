import React, { useEffect, useRef, useCallback } from "react";
import {
  ColorCodeMatrix,
  Vector,
  RenderableBlockDefinition,
} from "$types/typeCollection";
import getRenderableBlock from "$utils/getRandomBlock";
import { moveBlockByOne, renderableBlockList } from "$utils/block/block";

interface FallingBlockProps {
  setActiveBlock: React.Dispatch<
    React.SetStateAction<RenderableBlockDefinition>
  >;
  setHookLocation: React.Dispatch<React.SetStateAction<Vector>>;
  staticBlocksMatrix: ColorCodeMatrix;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<ColorCodeMatrix>>;
  canMoveDown: boolean;
  fallInterval: number;
  endFallHandler: (fall: number, spawnBlock: () => void) => void;
  isRunning: boolean;
  resetRotation: () => void;
  nextBlock: RenderableBlockDefinition | undefined;
  setNextBlock: React.Dispatch<React.SetStateAction<RenderableBlockDefinition>>;
}

const MIN_INTERVAL = 0;

export default function useFallingBlock({
  setActiveBlock,
  setHookLocation,
  staticBlocksMatrix,
  setStaticBlocksMatrix,
  canMoveDown,
  fallInterval,
  endFallHandler,
  isRunning,
  resetRotation,
  nextBlock,
  setNextBlock,
}: FallingBlockProps) {
  const passedIntervalTime = useRef(0);
  const intervalStartTimestamp = useRef(0);
  const fall = useRef<undefined | number>(undefined);

  const spawnBlock = useCallback(() => {
    if (!nextBlock) {
      setNextBlock(getRenderableBlock(renderableBlockList));
      setActiveBlock(getRenderableBlock(renderableBlockList));
    } else {
      setActiveBlock(nextBlock);
      setNextBlock(getRenderableBlock(renderableBlockList));
    }
  }, [setActiveBlock, nextBlock, setNextBlock]);

  const handleFall = useCallback(
    function handleFall() {
      fall.current = setInterval(() => {
        intervalStartTimestamp.current = Date.now();
        if (
          !staticBlocksMatrix ||
          typeof setStaticBlocksMatrix !== "function"
        ) {
          return;
        }

        if (canMoveDown) {
          moveBlockByOne(setHookLocation, "down");
        } else {
          resetRotation();
          fall.current && endFallHandler(fall.current, spawnBlock);
        }
      }, Math.max(MIN_INTERVAL, fallInterval - passedIntervalTime.current));
    },
    [
      canMoveDown,
      setHookLocation,
      setStaticBlocksMatrix,
      spawnBlock,
      staticBlocksMatrix,
      fallInterval,
      endFallHandler,
      resetRotation,
    ]
  );

  useEffect(() => {
    if (!isRunning) return;

    handleFall();

    return () => {
      passedIntervalTime.current = Date.now() - intervalStartTimestamp.current;
      clearInterval(fall.current);
    };
  }, [fall, fallInterval, handleFall, isRunning]);
}
