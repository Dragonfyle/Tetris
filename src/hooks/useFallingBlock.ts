import { useEffect, useRef } from "react";
import { solidifyBlock } from "../utils/solidifyBlock";
import { blockCoords } from "../utils/globalTypes";

interface FallingBlockProps {
  blockPosition: blockCoords;
  setBlockPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  isBlockedUnder: boolean;
  staticBlocksMatrix: Array<boolean[]>;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>;
  fallInterval: number;
}

const MIN_INTERVAL = 0;

export default function useFallingBlock({
  blockPosition,
  setBlockPosition,
  staticBlocksMatrix,
  setStaticBlocksMatrix,
  isBlockedUnder,
  fallInterval,
}: FallingBlockProps) {
  const passedTime = useRef(0);
  const lastIntervalTimeStamp = useRef(0);
  passedTime.current = Date.now() - lastIntervalTimeStamp.current;

  useEffect(() => {
    function createNewBlock() {
      setBlockPosition({ x: 3, y: 0 });
    }

    const fall = setInterval(() => {
      lastIntervalTimeStamp.current = Date.now();

      if (!staticBlocksMatrix || typeof setStaticBlocksMatrix !== "function") {
        return;
      }
      if (isBlockedUnder) {
        solidifyBlock(setStaticBlocksMatrix, blockPosition);
        createNewBlock();
      } else {
        setBlockPosition((prevPos) => {
          return { ...prevPos, y: prevPos.y + 1 };
        });
      }
    }, Math.max(MIN_INTERVAL, fallInterval - passedTime.current));

    return () => {
      clearInterval(fall);
    };
  }, [
    setBlockPosition,
    isBlockedUnder,
    blockPosition,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    fallInterval,
  ]);

  return [blockPosition, setBlockPosition] as const;
}
