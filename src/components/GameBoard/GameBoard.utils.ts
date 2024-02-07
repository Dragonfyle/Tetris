import { BlockCoords } from "../../utils/block/block";
import {
  MoveDirection,
  SquareCoords,
  GameBoardMatrix,
} from "../../types/globalTypes";
import { BOARD_EDGE } from "../../config/board";

export function createMatrix(width: number, height: number): GameBoardMatrix {
  return Array(width * height)
    .fill(false, 0, width * height)
    .reduce(
      (acc, el, idx) => {
        if (idx % width === 0 && idx) {
          acc.currentRow += 1;
        }

        if (!acc.matrix[acc.currentRow]) {
          acc.matrix[acc.currentRow] = [];
        }

        acc.matrix[acc.currentRow].push(el);

        return acc;
      },
      { currentRow: 0, matrix: [] }
    ).matrix;
}

function isOnBoard([y, x]: SquareCoords) {
  return (
    y > BOARD_EDGE.TOP &&
    y <= BOARD_EDGE.BOTTOM &&
    x >= BOARD_EDGE.LEFT &&
    x <= BOARD_EDGE.RIGHT
  );
}

function getAdjacentPosition(
  direction: MoveDirection,
  staticBlocksMatrix: GameBoardMatrix,
  [y, x]: SquareCoords
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

export function isPositionOccupied(
  direction: MoveDirection,
  blockPosition: BlockCoords,
  staticBlocksMatrix: GameBoardMatrix
) {
  return blockPosition.some(([y, x]) => {
    if (
      isOnBoard([y, x]) &&
      getAdjacentPosition(direction, staticBlocksMatrix, [y, x])
    ) {
      return true;
    }
  });
}

export function isBoardEdge(
  direction: MoveDirection,
  blockPosition: BlockCoords
) {
  switch (direction) {
    case "left":
      return blockPosition.some(([, x]) => x === BOARD_EDGE.LEFT);
    case "right":
      return blockPosition.some(([, x]) => x === BOARD_EDGE.RIGHT);
    case "down":
      return blockPosition.some(([y]) => y === BOARD_EDGE.BOTTOM);
  }
}

export function createRow(width: number) {
  return Array(width).fill(Boolean);
}

export function pruneRow(row: boolean[]) {
  if (!row.every((column: boolean) => column)) {
    return row;
  } else {
    return null;
  }
}

export function createReadyToRender(
  staticBlocksMatrix: GameBoardMatrix,
  blockPosition: BlockCoords
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
