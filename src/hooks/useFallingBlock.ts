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
  const passedIntervalTime = useRef(0);
  const intervalStartTimestamp = useRef(0);
  const fall = useRef<undefined | number>(undefined);

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
          handleBlockSettle({ blockVectors, setStaticBlocksMatrix });
          resetHookLocation();
          spawnBlock();
        }
      }, Math.max(MIN_INTERVAL, fallInterval - passedIntervalTime.current));
    },
    [
      blockVectors,
      canMoveDown,
      resetHookLocation,
      setHookLocation,
      setStaticBlocksMatrix,
      spawnBlock,
      staticBlocksMatrix,
      fallInterval,
    ]
  );

  useEffect(() => {
    handleFall();

    return () => {
      passedIntervalTime.current = Date.now() - intervalStartTimestamp.current;
      clearInterval(fall.current);
    };
  }, [fall, fallInterval, handleFall]);
}
