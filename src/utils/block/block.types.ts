import { BLOCK_DEFINITIONS } from "$data/blockData";
import {
  KeyOfType,
  BlockVectors,
  Vector,
  MappedKeysAndValues,
  MoveDirection,
  BlockColorCode,
} from "$types/typeCollection";

type BlockDefinition = (0 | 1)[][];

type BlockDefinitions = typeof BLOCK_DEFINITIONS;

type BlockName = KeyOfType<BlockDefinitions>;

type RotationsList = BlockVectors[];

type RenderableBlockDefinition = {
  rotations: RotationsList;
  spawnHook: Vector;
  colorCode: BlockColorCode;
};

type RenderableBlockList = MappedKeysAndValues<
  BlockName,
  RenderableBlockDefinition
>;

interface TranslateBlockPosition {
  blockVectors: BlockVectors;
  offset: Vector;
}

type MoveBlockByOne = (hookLocation: Vector, direction: MoveDirection) => void;

export type {
  BlockDefinition,
  BlockName,
  RenderableBlockList,
  RenderableBlockDefinition,
  BlockDefinitions,
  RotationsList,
  MoveBlockByOne,
  TranslateBlockPosition,
};
