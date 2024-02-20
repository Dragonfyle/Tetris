import { useEffect, useRef, useCallback } from "react";
import { handleBlockSettle } from "../utils/handleBlockSettle";
import { BinaryMatrix, BlockVectors, Vector } from "../types/globalTypes";
import getRenderableBlock from "../utils/getRandomBlock";
import {
  RenderableBlockDefinition,
  moveBlockByOne as moveHookByOne,
  renderableBlockList,
} from "../utils/block/block";
import { SPAWN_LOCATION } from "../config/initialSettings";

interface FallingBlockProps {
  blockPosition: BlockVectors;
  setActiveBlock: React.Dispatch<
    React.SetStateAction<RenderableBlockDefinition>
  >;
  setHookLocation: React.Dispatch<React.SetStateAction<Vector>>;
  staticBlocksMatrix: BinaryMatrix;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<BinaryMatrix>>;
  isBlockedDown: boolean;
  fallInterval: number;
}

const MIN_INTERVAL = 0;

export default function useFallingBlock({
  blockPosition,
  setActiveBlock,
  setHookLocation,
  staticBlocksMatrix,
  setStaticBlocksMatrix,
  isBlockedDown,
  fallInterval,
}: FallingBlockProps) {
  const passedTime = useRef(0);
  const lastIntervalTimeStamp = useRef(0);
  passedTime.current = Date.now() - lastIntervalTimeStamp.current;

  const spawnBlock = useCallback(
    function spawnBlock() {
      const block = getRenderableBlock(renderableBlockList);
      setActiveBlock(block);
    },
    [setActiveBlock]
  );

  const resetHookLocation = useCallback(
    function resetHookLocation() {
      setHookLocation(() => SPAWN_LOCATION);
    },
    [setHookLocation]
  );

  useEffect(() => {
    const fall = setInterval(() => {
      lastIntervalTimeStamp.current = Date.now();

      if (!staticBlocksMatrix || typeof setStaticBlocksMatrix !== "function") {
        return;
      }
      if (isBlockedDown) {
        handleBlockSettle({ blockPosition, setStaticBlocksMatrix });
        resetHookLocation();
        spawnBlock();
      } else {
        moveHookByOne(setHookLocation, "down");
      }
    }, Math.max(MIN_INTERVAL, fallInterval - passedTime.current));

    return () => {
      clearInterval(fall);
    };
  }, [
    blockPosition,
    resetHookLocation,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedDown,
    fallInterval,
    spawnBlock,
  ]);
}
