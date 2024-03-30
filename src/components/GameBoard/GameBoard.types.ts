import {
  ColorCodeMatrix,
  BlockVectors,
  MoveDirection,
  PositionStatuses,
} from "$types/typeCollection";
import { RenderableBlockDefinition } from "$types/typeCollection";
import React from "react";

interface GameBoardProps {
  numRowsFilled: number;
  setNumRowsFilled: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  nextBlock: RenderableBlockDefinition | undefined;
  setNextBlock: React.Dispatch<React.SetStateAction<RenderableBlockDefinition>>;
}

type GetPositionStatus = (
  directions: MoveDirection[],
  blockPosition: BlockVectors,
  staticBlocksMatrix: ColorCodeMatrix
) => PositionStatuses;

export type { GameBoardProps, GetPositionStatus };
