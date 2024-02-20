import { BLOCK_DEFINITIONS } from "../../data/blockData";
import {
  MoveDirection,
  BlockCoords,
  CoordsPair,
} from "../../types/globalTypes";
import { transformDefinitions } from "../transformDefinitions";

type BlockShape = (0 | 1)[][];

type PrimitiveBlockDefinitions = typeof BLOCK_DEFINITIONS;

type BlockName = keyof PrimitiveBlockDefinitions;

type RotationsList = BlockCoords[];

type RotationIdx = 0 | 1 | 2 | 3;

type RenderableBlockDefinition = {
  rotations: RotationsList;
  spawnHook: CoordsPair;
};

type RotationDirection = "clockwise" | "counterclockwise";

type RenderableBlockList = { [key: string]: RenderableBlockDefinition };

interface TranslateBlockPosition {
  coords: BlockCoords;
  offset: CoordsPair;
}

type MoveBlockByOne = (
  callback: React.Dispatch<React.SetStateAction<CoordsPair>>,
  direction: MoveDirection
) => void;

const INITIAL_ROTATION_IDX = 0;

const NUM_ROTATIONS = 4;

const renderableBlockList = transformDefinitions(BLOCK_DEFINITIONS);

function translateBlockPosition({
  coords,
  offset: [offsetY, offsetX],
}: TranslateBlockPosition): BlockCoords {
  return coords.map(([y, x]) => [y + offsetY, x + offsetX]);
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
  BlockShape,
  BlockName,
  RenderableBlockList,
  RenderableBlockDefinition,
  PrimitiveBlockDefinitions,
  RotationsList,
  RotationIdx,
  RotationDirection,
};

export {
  renderableBlockList,
  moveHookByOne as moveBlockByOne,
  getNextRotation,
  translateBlockPosition,
  INITIAL_ROTATION_IDX,
  NUM_ROTATIONS,
};
