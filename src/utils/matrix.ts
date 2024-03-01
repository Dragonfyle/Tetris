import { BinaryRow, BinaryMatrix } from "$types/typeCollection";

function createBinaryArray(length: number) {
  return Array(length).fill(0);
}

const createRow = createBinaryArray;

function makeMatrixFromArray(array: BinaryRow, rowLength: number) {
  return array.reduce(
    (acc, el, idx) => {
      if (idx % rowLength === 0 && idx) {
        acc.currentRow += 1;
      }

      if (!acc.matrix[acc.currentRow]) {
        acc.matrix[acc.currentRow] = [] as BinaryRow;
      }

      acc.matrix[acc.currentRow].push(el);

      return acc;
    },
    { currentRow: 0, matrix: [] as BinaryMatrix }
  ).matrix;
}

function createMatrix(width: number, height: number): BinaryMatrix {
  const binaryArray = createBinaryArray(width * height);

  return makeMatrixFromArray(binaryArray, width);
}

export { createMatrix, createRow };
