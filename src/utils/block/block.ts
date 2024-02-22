import {
  RotationDirection,
  BlockVectors,
  Vector,
  TranslateBlockPosition,
  MoveBlockByOne,
  RotationIdx,
} from "$types/typeCollection";
import { BLOCK_DEFINITIONS } from "$data/blockData";
import { transformDefinitions } from "$utils/transformDefinitions";

const INITIAL_ROTATION_IDX = 0;

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

const ROTATION_TO_IDX_MAP = {
  clockwise: 1,
  counterclockwise: -1,
};

const renderableBlockList = transformDefinitions(BLOCK_DEFINITIONS);

function translateVector(vector: Vector, offset: Vector) {
  const [vectorY, vectorX] = vector;
  const [offsetY, offsetX] = offset;
  return [vectorY + offsetY, vectorX + offsetX] as Vector;
}

function translateBlockPosition({
  BlockVectors,
  offset,
}: TranslateBlockPosition): BlockVectors {
  return BlockVectors.map((vector) => translateVector(vector, offset));
}

const moveHookByOne: MoveBlockByOne = (setHookLocation, direction) => {
  const offset = TRANSLATION_VECTORS[direction];

  setHookLocation(([y, x]) => translateVector([y, x], offset));
};

function getNextRotation(
  direction: RotationDirection,
  currentRotationIndex: RotationIdx
): RotationIdx {
  const newIdx = ((currentRotationIndex + ROTATION_TO_IDX_MAP[direction]) %
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
