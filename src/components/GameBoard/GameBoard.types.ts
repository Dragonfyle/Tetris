import {
  BinaryMatrix,
  BlockVectors,
  MoveDirection,
  PositionStatuses,
} from "$types/globalTypes";

interface GameBoardProps {
  numRowsFilled: number;
  setNumRowsFilled: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

type GetPositionStatus = (
  directions: MoveDirection[],
  blockPosition: BlockVectors,
  staticBlocksMatrix: BinaryMatrix
) => PositionStatuses;

export type { GameBoardProps, GetPositionStatus };
