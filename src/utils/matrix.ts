import { GameBoardMatrix } from "../types/globalTypes";

function createMatrix(width: number, height: number): GameBoardMatrix {
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
  return Array(width).fill(Boolean);
}

export { createMatrix, createRow };
