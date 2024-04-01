import {
  ColorCodeMatrix,
  BlockVectors,
  MoveDirection,
  PositionStatuses,
} from "$types/typeCollection";
interface GameBoardProps {
  score: number;
}

type GetPositionStatus = (
  directions: MoveDirection[],
  blockPosition: BlockVectors,
  staticBlocksMatrix: ColorCodeMatrix
) => PositionStatuses;

export type { GameBoardProps, GetPositionStatus };
