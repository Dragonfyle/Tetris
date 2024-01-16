export default function createMatrix(x: number, y: number) {
  return Array(x * y)
    .fill(false, 0, x * y)
    .reduce(
      (acc, button, index) => {
        if (index % x === 0 && index) {
          acc.currentRow += 1;
        }

        if (!acc.matrix[acc.currentRow]) {
          acc.matrix[acc.currentRow] = [];
        }

        acc.matrix[acc.currentRow].push(button);

        return acc;
      },
      { currentRow: 0, matrix: [] }
    ).matrix;
}
