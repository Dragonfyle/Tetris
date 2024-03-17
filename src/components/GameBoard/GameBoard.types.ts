import {
  BinaryMatrix,
  BlockVectors,
  MoveDirection,
  PositionStatuses,
} from "$types/globalTypes";

interface GameBoardProps {
  numRowsFilled: number;
  isGameOver: boolean;
  setNumRowsFilled: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

type GetPositionStatus = (
  directions: MoveDirection[],
  blockPosition: BlockVectors,
  staticBlocksMatrix: BinaryMatrix
) => PositionStatuses;

export type { GameBoardProps, GetPositionStatus };
