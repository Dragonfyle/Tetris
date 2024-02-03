import { useEffect, useRef } from "react";
import { handleBlockSettle } from "../utils/handleBlockSettle";
import { BlockCoords } from "../utils/globalTypes";

interface FallingBlockProps {
  blockPosition: BlockCoords;
  setBlockPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  staticBlocksMatrix: Array<boolean[]>;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>;
  isBlockedUnder: boolean;
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
        handleBlockSettle(setStaticBlocksMatrix, blockPosition);
        createNewBlock();
      } else {
        setBlockPosition((prevPos) => {
          //todo moveBlockFn
          return { ...prevPos, y: prevPos.y + 1 };
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
    isBlockedUnder,
    fallInterval,
  ]);

  return [blockPosition, setBlockPosition] as const;
}
