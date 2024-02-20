type KeyOfType<T> = keyof T;
type MappedKeysAndValues<K extends string, V> = {
  [key in K]: V;
};

type Vector = [number, number];
type BlockVectors = Vector[];
type GameBoardMatrix = boolean[][];
type MoveDirection = "down" | "left" | "right";
type RotationDirection = "clockwise" | "counterclockwise";

export type {
  KeyOfType,
  MappedKeysAndValues,
  Vector,
  BlockVectors,
  GameBoardMatrix,
  MoveDirection,
  RotationDirection,
};
