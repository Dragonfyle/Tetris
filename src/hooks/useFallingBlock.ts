import { useEffect, useRef, useCallback } from "react";
import { handleBlockSettle } from "$utils/handleBlockSettle";
import {
  BinaryMatrix,
  BlockVectors,
  Vector,
  RenderableBlockDefinition,
} from "$types/typeCollection";
import getRenderableBlock from "$utils/getRandomBlock";
import { moveBlockByOne, renderableBlockList } from "$utils/block/block";
import { SPAWN_LOCATION } from "$config/initialSettings";

interface FallingBlockProps {
  blockVectors: BlockVectors;
  setActiveBlock: React.Dispatch<
    React.SetStateAction<RenderableBlockDefinition>
  >;
  setHookLocation: React.Dispatch<React.SetStateAction<Vector>>;
  staticBlocksMatrix: BinaryMatrix;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<BinaryMatrix>>;
  canMoveDown: boolean;
  fallInterval: number;
}

const MIN_INTERVAL = 0;

export default function useFallingBlock({
  blockVectors,
  setActiveBlock,
  setHookLocation,
  staticBlocksMatrix,
  setStaticBlocksMatrix,
  canMoveDown,
  fallInterval,
}: FallingBlockProps) {
  const passedTime = useRef(0);
  const lastIntervalTimeStamp = useRef(0);

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
    passedTime.current = Date.now() - lastIntervalTimeStamp.current;

    const fall = setInterval(() => {
      if (!staticBlocksMatrix || typeof setStaticBlocksMatrix !== "function") {
        return;
      }
      if (canMoveDown) {
        moveBlockByOne(setHookLocation, "down");
      } else {
        handleBlockSettle({ blockVectors, setStaticBlocksMatrix });
        resetHookLocation();
        spawnBlock();
      }
    }, Math.max(MIN_INTERVAL, fallInterval - passedTime.current));

    return () => {
      console.log("not ok");
      lastIntervalTimeStamp.current = Date.now();
      passedTime.current = 0;
      clearInterval(fall);
    };
  }, [
    blockVectors,
    resetHookLocation,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    canMoveDown,
    fallInterval,
    spawnBlock,
  ]);
}
