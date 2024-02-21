import { BLOCK_DEFINITIONS } from "$data/blockData";
import {
  KeyOfType,
  BlockVectors,
  Vector,
  MappedKeysAndValues,
  MoveDirection,
} from "$types/typeCollection";

type BlockDefinition = (0 | 1)[][];

type BlockDefinitions = typeof BLOCK_DEFINITIONS;

type BlockName = KeyOfType<BlockDefinitions>;

type RotationsList = BlockVectors[];

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
