import { BLOCK_DEFINITIONS } from "$data/blockData";
import {
  KeyOfType,
  MappedKeysAndValues,
  MoveDirection,
  RotationDirection,
  BlockVectors,
  Vector,
} from "$types/globalTypes";
import { transformDefinitions } from "$utils/transformDefinitions";

type BlockDefinition = (0 | 1)[][];

type BlockDefinitions = typeof BLOCK_DEFINITIONS;

type BlockName = KeyOfType<BlockDefinitions>;

type RotationsList = BlockVectors[];

type RotationIdx = 0 | 1 | 2 | 3;

type RenderableBlockDefinition = {
  rotations: RotationsList;
  spawnHook: Vector;
};

type RenderableBlockList = MappedKeysAndValues<
  BlockName,
  RenderableBlockDefinition
>;

interface TranslateBlockPosition {
  BlockVectors: BlockVectors;
  offset: Vector;
}

type MoveBlockByOne = (
  callback: React.Dispatch<React.SetStateAction<Vector>>,
  direction: MoveDirection
) => void;

const INITIAL_ROTATION_IDX = 0;

const NUM_ROTATIONS = 4;

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

const moveHookByOne: MoveBlockByOne = (callback, direction) => {
  switch (direction) {
    case "down":
      callback(([y, x]) => [y + 1, x]);
      break;
    case "left":
      callback(([y, x]) => [y, x - 1]);
      break;
    case "right":
      callback(([y, x]) => [y, x + 1]);
      break;
    default:
      callback(([y, x]) => [y, x]);
      break;
  }
};

function getNextRotation(
  direction: RotationDirection,
  currentRotationIndex: RotationIdx
): RotationIdx {
  switch (direction) {
    case "clockwise":
      return ((currentRotationIndex + 1) % NUM_ROTATIONS) as RotationIdx;
    case "counterclockwise":
      return ((currentRotationIndex - 1 + NUM_ROTATIONS) %
        NUM_ROTATIONS) as RotationIdx;
  }
}

export type {
  BlockDefinition,
  BlockName,
  RenderableBlockList,
  RenderableBlockDefinition,
  BlockDefinitions,
  RotationsList,
  RotationIdx,
};

export {
  renderableBlockList,
  moveHookByOne as moveBlockByOne,
  getNextRotation,
  translateVector,
  translateBlockPosition,
  INITIAL_ROTATION_IDX,
  NUM_ROTATIONS,
};
