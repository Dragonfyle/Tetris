import { Vector } from "$types/typeCollection";
import { BlockDefinition } from "$types/typeCollection";

const BLOCK_DEFINITIONS = {
  I: {
    //the matrix with a block shape should be a square with the shortest possible side eg. if the block is 4 squares high and 1 square wide, the minimum side length is 4.
    SHAPE: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 2] as Vector,
    COLOR_CODE: 1,
  },
  L: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
    COLOR_CODE: 2,
  },
  J: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
    COLOR_CODE: 3,
  },
  S: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
    COLOR_CODE: 4,
  },
  Z: {
    SHAPE: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
    COLOR_CODE: 5,
  },
  T: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
    COLOR_CODE: 6,
  },
  O: {
    SHAPE: [
      [1, 1],
      [1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
    COLOR_CODE: 7,
  },
};

export { BLOCK_DEFINITIONS };
