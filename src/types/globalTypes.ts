type SquareCoords = [y: number, x: number];

type CoordsPair = [number, number];

type BlockCoords = CoordsPair[];

type GameBoardMatrix = boolean[][];

type MoveDirection = "down" | "left" | "right";

export type {
  SquareCoords,
  CoordsPair,
  BlockCoords,
  GameBoardMatrix,
  MoveDirection,
};
