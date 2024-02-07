import { useEffect, useRef, useCallback } from "react";
import { handleBlockSettle } from "../utils/handleBlockSettle";
import { BlockCoords, translateCoordsToSpawnPos } from "../utils/block/block";
import getRandomBlock from "../utils/getRandomBlock";

interface FallingBlockProps {
  blockPosition: BlockCoords;
  setBlockPosition: React.Dispatch<React.SetStateAction<BlockCoords>>;
  staticBlocksMatrix: Array<boolean[]>;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>;
  isBlockedDown: boolean;
  fallInterval: number;
}

const MIN_INTERVAL = 0;

export default function useFallingBlock({
  blockPosition,
  setBlockPosition,
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
      const block = getRandomBlock();
      const spawnPos = translateCoordsToSpawnPos(block);
      setBlockPosition(spawnPos);
    },
    [setBlockPosition]
  );

  useEffect(() => {
    const fall = setInterval(() => {
      lastIntervalTimeStamp.current = Date.now();

      if (!staticBlocksMatrix || typeof setStaticBlocksMatrix !== "function") {
        return;
      }
      if (isBlockedDown) {
        handleBlockSettle(setStaticBlocksMatrix, blockPosition);
        spawnBlock();
      } else {
        setBlockPosition((prevPos) => {
          const newPos = prevPos.map(([y, x]) => [y + 1, x]);
          return newPos;
        });
      }
    }, Math.max(MIN_INTERVAL, fallInterval - passedTime.current));

    return () => {
      clearInterval(fall);
    };
  }, [
    blockPosition,
    setBlockPosition,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedDown,
    fallInterval,
    spawnBlock,
  ]);

  return [blockPosition, setBlockPosition] as const;
}
