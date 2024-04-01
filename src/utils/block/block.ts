import {
  BlockVectors,
  Vector,
  TranslateBlockPosition,
  MoveBlockByOne,
  RotationIdx,
} from "$types/typeCollection";
import { BLOCK_DEFINITIONS } from "$data/blockData";
import { transformDefinitions } from "$utils/transformDefinitions";

const INITIAL_ROTATION_IDX = 0 as RotationIdx;

const ROTATIONS = {
  MIN_IDX: 0 as RotationIdx,
  MAX_IDX: 3 as RotationIdx,
  NUM_ROTATIONS: 4,
};

const TRANSLATION_VECTORS = {
  left: [0, -1] as Vector,
  right: [0, 1] as Vector,
  down: [1, 0] as Vector,
};

const renderableBlockList = transformDefinitions(BLOCK_DEFINITIONS);

function translateVector(vector: Vector, offset: Vector) {
  const [vectorY, vectorX] = vector;
  const [offsetY, offsetX] = offset;
  return [vectorY + offsetY, vectorX + offsetX] as Vector;
}

function translateBlockPosition({
  blockVectors,
  offset,
}: TranslateBlockPosition): BlockVectors {
  return blockVectors.map((vector) => translateVector(vector, offset));
}

const moveHookByOne: MoveBlockByOne = (hookLocation, direction) => {
  const offset = TRANSLATION_VECTORS[direction];

  return translateVector(hookLocation, offset);
};

function getNextRotation(currentRotationIndex: RotationIdx): RotationIdx {
  const newIdx = ((currentRotationIndex + 1) %
    ROTATIONS.NUM_ROTATIONS) as RotationIdx;

  if (newIdx > ROTATIONS.NUM_ROTATIONS - 1) {
    return ROTATIONS.MIN_IDX;
  } else if (newIdx < 0) {
    return ROTATIONS.MAX_IDX;
  } else {
    return newIdx;
  }
}

export {
  renderableBlockList,
  moveHookByOne as moveBlockByOne,
  getNextRotation,
  translateVector,
  translateBlockPosition,
  INITIAL_ROTATION_IDX,
  ROTATIONS,
};
