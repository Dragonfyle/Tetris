import { BLOCK_COLORS_MAP } from "$config/initialSettings";

type BlockColorCode = keyof typeof BLOCK_COLORS_MAP;
type ColorCodeRow = BlockColorCode[];
type ColorCodeMatrix = ColorCodeRow[];
type KeyOfType<T> = keyof T;
type MappedKeysAndValues<K extends string, V> = {
  [key in K]: V;
};
type PositionStatuses = { [key in MoveDirection]: boolean };
type Vector = [number, number];
type BlockVectors = Vector[];
type MoveDirection = "down" | "left" | "right";
type RotationDirection = "clockwise" | "counterclockwise";
type RotationIdx = 0 | 1 | 2 | 3;
type HighScores = { [key: number]: number };

export type {
  ColorCodeRow,
  ColorCodeMatrix,
  KeyOfType,
  MappedKeysAndValues,
  Vector,
  BlockVectors,
  MoveDirection,
  RotationDirection,
  RotationIdx,
  PositionStatuses,
  BlockColorCode,
  HighScores,
};
