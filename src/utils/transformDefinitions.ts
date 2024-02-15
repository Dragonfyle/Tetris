import type {
  PrimitiveBlockDefinitions,
  BlockShape,
  RenderableBlockList,
  RotationsList,
} from "./block/block";
import { CoordsPair } from "../types/globalTypes";

const NUM_ROTATIONS = 4;

function rotateClockwise(blockShape: BlockShape) {
  const inputShape = [...blockShape.map((row) => [...row])];

  return inputShape[0].map((_, idx) =>
    inputShape.map((column) => column[idx]).reverse()
  );
}

function getMatrixRotations(blockShape: BlockShape) {
  const inputShape = [...blockShape.map((row) => [...row])];
  const AllRotations: BlockShape[] = [inputShape];
  AllRotations.push(inputShape);

  for (let i = 1; i < NUM_ROTATIONS; i++) {
    AllRotations.push(rotateClockwise(AllRotations[i - 1]));
  }

  return AllRotations;
}

function extractSparseRotations(blockShapes: BlockShape[]) {
  const blockCoords: CoordsPair[][] = [];

  blockShapes.forEach((blockShape) => {
    const sparseBlockRotations: CoordsPair[] = [];

    blockShape.map((row, rowIdx) =>
      row.map((column, colIdx) => {
        if (column) {
          sparseBlockRotations.push([rowIdx, colIdx]);
        }
      })
    );
    blockCoords.push(sparseBlockRotations);
  });

  return blockCoords;
}

function getBlockRotationList(blockShape: BlockShape) {
  const inputShape = [...blockShape.map((row) => [...row])];
  const rotations = getMatrixRotations(inputShape);
  const coordsList: RotationsList = extractSparseRotations(rotations);

  return coordsList;
}

function transformDefinitions(blockDefinitions: PrimitiveBlockDefinitions) {
  const renderableBlockDefinitions = {} as RenderableBlockList;

  Object.entries(blockDefinitions).forEach(([key, value]) => {
    renderableBlockDefinitions[key] = {
      rotations: getBlockRotationList(value.SHAPE),
      spawnHook: value.SPAWN_HOOK as CoordsPair,
    };
  });
  return renderableBlockDefinitions;
}

export { transformDefinitions };
