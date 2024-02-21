import { BinaryMatrix } from "$types/globalTypes";

function createMatrix(width: number, height: number): BinaryMatrix {
  return Array(width * height)
    .fill(false, 0, width * height)
    .reduce(
      (acc, el, idx) => {
        if (idx % width === 0 && idx) {
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

function createRow(width: number) {
  console.log(Array(width).fill(0));
  return Array(width).fill(0);
}

export { createMatrix, createRow };
