import { useEffect, useRef, useCallback } from "react";
import { handleBlockSettle } from "../utils/handleBlockSettle";
import { BlockCoords, CoordsPair } from "../types/globalTypes";
import getRenderableBlock from "../utils/getRandomBlock";
import {
  RenderableBlockDefinition,
  renderableBlockList,
} from "../utils/block/block";

interface FallingBlockProps {
  blockPosition: BlockCoords;
  setActiveBlock: React.Dispatch<
    React.SetStateAction<RenderableBlockDefinition>
  >;
  setHookLocation: React.Dispatch<React.SetStateAction<CoordsPair>>;
  staticBlocksMatrix: Array<boolean[]>;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>;
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

  useEffect(() => {
    const fall = setInterval(() => {
      lastIntervalTimeStamp.current = Date.now();

      if (!staticBlocksMatrix || typeof setStaticBlocksMatrix !== "function") {
        return;
      }
      if (isBlockedDown) {
        handleBlockSettle({ blockPosition, setStaticBlocksMatrix });
        spawnBlock();
      } else {
        setHookLocation(([y, x]) => [y + 1, x]);
      }
    }, Math.max(MIN_INTERVAL, fallInterval - passedTime.current));

    return () => {
      clearInterval(fall);
    };
  }, [
    blockPosition,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedDown,
    fallInterval,
    spawnBlock,
  ]);
}
