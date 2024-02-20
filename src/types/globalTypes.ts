type BinaryElement = 0 | 1;
type BinaryRow = BinaryElement[];
type BinaryMatrix = BinaryRow[];
type KeyOfType<T> = keyof T;
type MappedKeysAndValues<K extends string, V> = {
  [key in K]: V;
};

type Vector = [number, number];
type BlockVectors = Vector[];
type MoveDirection = "down" | "left" | "right";
type RotationDirection = "clockwise" | "counterclockwise";

export type {
  BinaryElement,
  BinaryRow,
  BinaryMatrix,
  KeyOfType,
  MappedKeysAndValues,
  Vector,
  BlockVectors,
  MoveDirection,
  RotationDirection,
};
