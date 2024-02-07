import { MoveDirection } from "../../types/common";

export type BlockList = typeof blockList;

export type BlockCoords = typeof blockList.I.coordList;

export type Block = keyof typeof blockList;

export const blockList = Object.freeze({
  I: {
    coordList: [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [-3, 0],
    ],
  },
  L: {
    coordList: [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [0, 1],
    ],
  },
  J: {
    coordList: [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [0, -1],
    ],
  },
  S: {
    coordList: [
      [0, 0],
      [-1, 0],
      [1, -1],
      [0, -1],
    ],
  },
  Z: {
    coordList: [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 1],
    ],
  },
  T: {
    coordList: [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [-1, 1],
    ],
  },
  O: {
    coordList: [
      [0, 0],
      [0, 1],
      [-1, 0],
      [-1, 1],
    ],
  },
});

export function translateCoordsToStartPos(coords: BlockCoords) {
  return coords.map(([y, x]) => [y + 4, x + 4]);
}

export function translateBlockPosition(
  coords: BlockCoords,
  direction: MoveDirection
) {
  switch (direction) {
    case "down":
      return coords.map(([y, x]) => [y + 1, x]);
    case "left":
      return coords.map(([y, x]) => [y, x - 1]);
    case "right":
      return coords.map(([y, x]) => [y, x + 1]);
  }
}
