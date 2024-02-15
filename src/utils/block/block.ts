import { BLOCK_DEFINITIONS } from "../../data/blockData";
import {
  MoveDirection,
  BlockCoords,
  CoordsPair,
} from "../../types/globalTypes";
import { SPAWN_LOCATION } from "../../config/initialSettings";
import { transformDefinitions } from "../transformDefinitions";

type BlockShape = (0 | 1)[][];

type PrimitiveBlockDefinitions = typeof BLOCK_DEFINITIONS;

type BlockName = keyof PrimitiveBlockDefinitions;

type RotationsList = BlockCoords[];

type RotationIdx = 0 | 1 | 2 | 3;

type RenderableBlockDefinition = {
  rotations: RotationsList;
  spawnHook: CoordsPair;
  activeRotation: RotationIdx;
};

type RenderableBlockList = { [key: string]: RenderableBlockDefinition };

interface TranslateBlockPosition {
  coords: BlockCoords;
  offset: CoordsPair;
}

type MoveBlockByOne = (
  coords: CoordsPair,
  direction: MoveDirection
) => CoordsPair;

const INITIAL_ROTATION_IDX = 0;

const NUM_ROTATIONS = 4;

const renderableBlockList = transformDefinitions(BLOCK_DEFINITIONS);

const [spawnLocationY, spawnLocationX] = SPAWN_LOCATION;

function translateCoordsToSpawnPos({
  rotations,
  spawnHook,
  activeRotation,
}: RenderableBlockDefinition) {
  const [spawnHookY, spawnHookX] = spawnHook;
  const [translationY, translationX] = [
    spawnLocationY - spawnHookY,
    spawnLocationX - spawnHookX,
  ];

  return rotations[activeRotation].map(
    ([y, x]) => [y + translationY, x + translationX] as CoordsPair
  );
}

function translateBlockPosition({
  coords,
  offset: [offsetY, offsetX],
}: TranslateBlockPosition) {
  return coords.map(([y, x]) => [y + offsetY, x + offsetX]);
}

const moveBlockByOne: MoveBlockByOne = ([y, x], direction) => {
  switch (direction) {
    case "down":
      return [y + 1, x] as CoordsPair;
    case "left":
      return [y, x - 1] as CoordsPair;
    case "right":
      return [y, x + 1] as CoordsPair;
    default:
      return [y, x] as CoordsPair;
  }
};

function getNextRotation(
  direction: "clockwise" | "counterclockwise",
  currentRotationIndex: RotationIdx
) {
  switch (direction) {
    case "clockwise":
      return currentRotationIndex < NUM_ROTATIONS
        ? currentRotationIndex++
        : INITIAL_ROTATION_IDX;
    case "counterclockwise":
      return currentRotationIndex > INITIAL_ROTATION_IDX
        ? currentRotationIndex--
        : NUM_ROTATIONS - 1;
  }
}

export type {
  BlockShape,
  BlockName,
  RenderableBlockList,
  RenderableBlockDefinition,
  PrimitiveBlockDefinitions,
  RotationsList,
};

export {
  renderableBlockList,
  translateCoordsToSpawnPos,
  moveBlockByOne,
  getNextRotation,
  translateBlockPosition,
  INITIAL_ROTATION_IDX,
  NUM_ROTATIONS,
};
