import {
  BinaryElement,
  BinaryRow,
  BinaryMatrix,
  Vector,
  BlockVectors,
  MoveDirection,
  PositionStatuses,
} from "$types/typeCollection";
import { BOARD_EDGE } from "$config/board";
import { MIN_INTERVAL } from "$config/initialSettings";
import { GetPositionStatus } from "./GameBoard.types";

function isOnBoard([y, x]: Vector) {
  return (
    y >= BOARD_EDGE.TOP &&
    y <= BOARD_EDGE.BOTTOM &&
    x >= BOARD_EDGE.LEFT &&
    x <= BOARD_EDGE.RIGHT
  );
}

function isAdjacentPositionOccupied(
  direction: MoveDirection,
  staticBlocksMatrix: BinaryMatrix,
  [y, x]: Vector
) {
  switch (direction) {
    case "left":
      return staticBlocksMatrix[y]?.[x - 1];
    case "right":
      return staticBlocksMatrix[y]?.[x + 1];
    case "down":
      return staticBlocksMatrix[y + 1]?.[x];
  }
}

function canMoveToAdjacent(
  direction: MoveDirection,
  blockPosition: BlockVectors,
  staticBlocksMatrix: BinaryMatrix
) {
  return blockPosition.some(([y, x]) => {
    if (isAdjacentPositionOccupied(direction, staticBlocksMatrix, [y, x])) {
      return true;
    }
  });
}

function isBoardEdge(direction: MoveDirection, blockPosition: BlockVectors) {
  switch (direction) {
    case "left":
      return blockPosition.some(([, x]) => x === BOARD_EDGE.LEFT);
    case "right":
      return blockPosition.some(([, x]) => x === BOARD_EDGE.RIGHT);
    case "down":
      return blockPosition.some(([y]) => y === BOARD_EDGE.BOTTOM);
  }
}

function isRotationPossible(
  intendedBlockPosition: BlockVectors,
  staticBlocksMatrix: BinaryMatrix
) {
  return intendedBlockPosition.every(
    ([y, x]) => isOnBoard([y, x]) && !staticBlocksMatrix[y][x]
  );
}

function pruneRow(row: BinaryRow) {
  if (!row.every((column: BinaryElement) => column)) {
    return row;
  } else {
    return null;
  }
}

function mergeActiveBlockWithMatrix(
  staticBlocksMatrix: BinaryMatrix,
  blockPosition: BlockVectors
) {
  const readyToRender = JSON.parse(JSON.stringify(staticBlocksMatrix));
  blockPosition.map(([y, x]) => {
    if (x < 0 || y < 0) {
      return;
    }
    readyToRender[y][x] = true;
  });

  return readyToRender;
}

const getMovePossibilities: GetPositionStatus = (
  directions,
  blockPosition,
  staticBlocksMatrix
) => {
  const result = {} as PositionStatuses;

  for (const direction of directions) {
    const canMove =
      !isBoardEdge(direction, blockPosition) &&
      !canMoveToAdjacent(direction, blockPosition, staticBlocksMatrix);

    result[direction] = canMove;
  }

  return result;
};

function calculateFallInterval(
  initialInterval: number,
  speedupFactor: number,
  numRowsFilled: number
) {
  return Math.max(
    MIN_INTERVAL,
    initialInterval / speedupFactor - numRowsFilled * 3
  );
}

export {
  isOnBoard,
  isAdjacentPositionOccupied,
  canMoveToAdjacent,
  isBoardEdge,
  isRotationPossible,
  pruneRow,
  mergeActiveBlockWithMatrix,
  getMovePossibilities,
  calculateFallInterval,
};
