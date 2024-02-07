import { MoveDirection } from "../../types/globalTypes";
import { SPAWN_LOCATION } from "../../config/initialSettings";

export type BlockList = typeof blockList;

export type BlockCoords = typeof blockList.I.coordList;

export type Block = keyof typeof blockList;

export const blockList = Object.freeze({
  I: {
    coordList: [
      //the first element is a spawner hook - it will be used to position the block on the board when it spawns
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

const SPAWN_HOOK_IDX = 0;

const [spawnLocationY, spawnLocationX] = SPAWN_LOCATION;

export function translateCoordsToSpawnPos(coords: BlockCoords) {
  const [spawnHookY, spawnHookX] = coords[SPAWN_HOOK_IDX];
  const [translationY, translationX] = [
    spawnLocationY - spawnHookY,
    spawnLocationX - spawnHookX,
  ];

  return coords.map(([y, x]) => {
    return [y + translationY, x + translationX];
  });
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
