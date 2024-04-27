import {
  BlockVectors,
  Vector,
  MappedKeysAndValues,
  MoveDirection,
  BlockColorCode,
} from "$types/typeCollection";

type BlockDefinitionShape = (0 | 1)[][];

type BlockName = "I" | "L" | "J" | "S" | "Z" | "T" | "O";

type BlockDefinitions = {
  [key in BlockName]: {
    SHAPE: BlockDefinitionShape;
    SPAWN_HOOK: Vector;
    COLOR_CODE: BlockColorCode;
    ROTATES: boolean;
  };
};

type RotationsList = BlockVectors[];

type RenderableBlockDefinition = {
  rotations: RotationsList;
  spawnHook: Vector;
  colorCode: BlockColorCode;
  rotates: boolean;
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
  BlockDefinitionShape as BlockDefinition,
  BlockName,
  RenderableBlockList,
  RenderableBlockDefinition,
  BlockDefinitions,
  RotationsList,
  MoveBlockByOne,
  TranslateBlockPosition,
};
