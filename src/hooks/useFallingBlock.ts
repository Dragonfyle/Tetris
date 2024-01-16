import { useEffect } from "react";

interface useFallingBlockProps {
  blockPosition: { x: number; y: number };
  setBlockPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  isBlockedUnder: boolean;
  solidifyBlock: () => void;
  staticBlocksMatrix: Array<boolean[]>;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>;
  fallingInterval: number;
}

export default function useFallingBlock({
  blockPosition,
  setBlockPosition,
  staticBlocksMatrix,
  setStaticBlocksMatrix,
  isBlockedUnder,
  solidifyBlock,
  fallingInterval,
}: useFallingBlockProps) {
  useEffect(() => {
    function createNewBlock() {
      setBlockPosition({ x: 3, y: 0 });
    }

    const fall = setInterval(() => {
      if (!staticBlocksMatrix || typeof setStaticBlocksMatrix !== "function") {
        return;
      }
      if (isBlockedUnder) {
        solidifyBlock();
        createNewBlock();
      } else {
        setBlockPosition((prevPos) => {
          return { ...prevPos, y: prevPos.y + 1 };
        });
      }
    }, fallingInterval);

    return () => clearInterval(fall);
  }, [
    setBlockPosition,
    // solidifyBlock,
    isBlockedUnder,
    // blockPosition,
    // blockPosition.x,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    fallingInterval,
  ]);

  return [blockPosition, setBlockPosition] as const;
}
