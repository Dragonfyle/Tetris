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

type RenderableBlockDefinition = {
  rotations: RotationsList;
  spawnHook: CoordsPair;
};

type RenderableBlockList = { [key: string]: RenderableBlockDefinition };

const SPAWN_HOOK_IDX = 0;

const renderableBlockList = transformDefinitions(BLOCK_DEFINITIONS);

const [spawnLocationY, spawnLocationX] = SPAWN_LOCATION;

function translateCoordsToSpawnPos({
  rotations,
  spawnHook,
}: RenderableBlockDefinition) {
  const [spawnHookY, spawnHookX] = spawnHook;
  const [translationY, translationX] = [
    spawnLocationY - spawnHookY,
    spawnLocationX - spawnHookX,
  ];

  return rotations[SPAWN_HOOK_IDX].map(([y, x]) => {
    return [y + translationY, x + translationX] as CoordsPair;
  });
}

function translateBlockPosition(coords: BlockCoords, direction: MoveDirection) {
  switch (direction) {
    case "down":
      return coords.map(([y, x]) => [y + 1, x]) as BlockCoords;
    case "left":
      return coords.map(([y, x]) => [y, x - 1]) as BlockCoords;
    case "right":
      return coords.map(([y, x]) => [y, x + 1]) as BlockCoords;
  }
}

function rotateBlockClockwise(blockPosition: BlockCoords) {
  return blockPosition.map(([y, x]) => [-x, y]) as BlockCoords;
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
  translateBlockPosition,
  rotateBlockClockwise,
};
