import { BlockDefinitions } from "$types/typeCollection";

const BLOCK_DEFINITIONS: BlockDefinitions = {
  I: {
    //the matrix with a block shape should be a square with the shortest possible side eg. if the block is 4 squares high and 1 square wide, the minimum side length is 4.
    SHAPE: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    SPAWN_HOOK: [2, 2],
    COLOR_CODE: 1,
    ROTATES: true,
  },
  L: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    SPAWN_HOOK: [2, 1],
    COLOR_CODE: 2,
    ROTATES: true,
  },
  J: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    SPAWN_HOOK: [2, 1],
    COLOR_CODE: 3,
    ROTATES: true,
  },
  S: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    SPAWN_HOOK: [2, 1],
    COLOR_CODE: 4,
    ROTATES: true,
  },
  Z: {
    SHAPE: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    SPAWN_HOOK: [2, 1],
    COLOR_CODE: 5,
    ROTATES: true,
  },
  T: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    SPAWN_HOOK: [2, 1],
    COLOR_CODE: 6,
    ROTATES: true,
  },
  O: {
    SHAPE: [
      [1, 1],
      [1, 1],
    ],
    SPAWN_HOOK: [2, 1],
    COLOR_CODE: 7,
    ROTATES: false,
  },
};

export { BLOCK_DEFINITIONS };
