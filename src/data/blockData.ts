import { Vector } from "$types/globalTypes";
import { BlockDefinition } from "$utils/block/block";

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
  },
  L: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
  },
  J: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
  },
  S: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
  },
  Z: {
    SHAPE: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
  },
  T: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
  },
  O: {
    SHAPE: [
      [1, 1],
      [1, 1],
    ] as BlockDefinition,
    SPAWN_HOOK: [2, 1] as Vector,
  },
};

export { BLOCK_DEFINITIONS };
