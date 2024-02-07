export type GameBoardMatrix = boolean[][];

export function createMatrix(width: number, height: number): GameBoardMatrix {
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

export function createRow(width: number) {
  return Array(width).fill(Boolean);
}

export function pruneRow(row: boolean[]) {
  if (!row.every((column: boolean) => column)) {
    return row;
  } else {
    return null;
  }
}
