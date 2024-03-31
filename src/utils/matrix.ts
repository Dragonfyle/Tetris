import { ColorCodeRow, ColorCodeMatrix } from "$types/typeCollection";

function createBinaryArray(length: number) {
  return Array(length).fill(0);
}

const createRow = createBinaryArray;

function makeMatrixFromArray(array: ColorCodeRow, rowLength: number) {
  return array.reduce(
    (acc, el, idx) => {
      if (idx % rowLength === 0 && idx) {
        acc.currentRow += 1;
      }

      if (!acc.matrix[acc.currentRow]) {
        acc.matrix[acc.currentRow] = [] as ColorCodeRow;
      }

      acc.matrix[acc.currentRow].push(el);

      return acc;
    },
    { currentRow: 0, matrix: [] as ColorCodeMatrix }
  ).matrix;
}

function createMatrix(width: number, height: number): ColorCodeMatrix {
  const binaryArray = createBinaryArray(width * height);

  return makeMatrixFromArray(binaryArray, width);
}

function copyMatrix(staticBlocksMatrix: ColorCodeMatrix) {
  return [...staticBlocksMatrix.map((row) => [...row])] as ColorCodeMatrix;
}

export { createMatrix, createRow, copyMatrix };
