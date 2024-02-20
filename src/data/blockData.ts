import { BlockShape } from "../utils/block/block";

const BLOCK_DEFINITIONS = {
  I: {
    //the matrix with a block shape should be a square with the shortest possible side eg. if the block is 4 squares high and 1 square wide, the minimum side length is 4.
    SHAPE: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ] as BlockShape,
    SPAWN_HOOK: [2, 2],
  },
  L: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ] as BlockShape,
    SPAWN_HOOK: [2, 1],
  },
  J: {
    SHAPE: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ] as BlockShape,
    SPAWN_HOOK: [2, 1],
  },
  S: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ] as BlockShape,
    SPAWN_HOOK: [2, 1],
  },
  Z: {
    SHAPE: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ] as BlockShape,
    SPAWN_HOOK: [2, 1],
  },
  T: {
    SHAPE: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ] as BlockShape,
    SPAWN_HOOK: [2, 1],
  },
  O: {
    SHAPE: [
      [1, 1],
      [1, 1],
    ] as BlockShape,
    SPAWN_HOOK: [2, 1],
  },
};

export { BLOCK_DEFINITIONS };
