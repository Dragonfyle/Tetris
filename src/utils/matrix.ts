import { ColorCodeRow, ColorCodeMatrix } from "$types/typeCollection";

interface Acc {
  currentRow: number;
  matrix: ColorCodeMatrix;
}

function createRow(length: number) {
  return Array(length).fill(0);
}

function makeMatrixFromArray(array: ColorCodeRow, rowLength: number) {
  return array.reduce<Acc>(
    (acc, el, idx) => {
      if (idx % rowLength === 0 && idx) {
        acc.currentRow += 1;
      }

      if (!acc.matrix[acc.currentRow]) {
        acc.matrix[acc.currentRow] = [];
      }

      acc.matrix[acc.currentRow].push(el);

      return acc;
    },
    { currentRow: 0, matrix: [] }
  ).matrix;
}

function createMatrix(width: number, height: number): ColorCodeMatrix {
  const binaryArray = createRow(width * height);

  return makeMatrixFromArray(binaryArray, width);
}

function copyMatrix(staticBlocksMatrix: ColorCodeMatrix) {
  return [...staticBlocksMatrix.map((row) => [...row])] as ColorCodeMatrix;
}

export { createMatrix, createRow, copyMatrix };
