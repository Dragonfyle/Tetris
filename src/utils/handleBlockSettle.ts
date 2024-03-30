import { BlockVectors } from "$types/typeCollection.ts";
import { BlockColorCode, ColorCodeMatrix } from "$types/typeCollection.ts";
import { copyMatrix, createRow } from "./matrix";
import { isOnBoard, pruneRow } from "$components/GameBoard/GameBoard.utils";
import { BOARD_DIMENSIONS } from "$config/board";

interface HandleBlockSettle {
  blockVectors: BlockVectors;
  staticBlocksMatrix: ColorCodeMatrix;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<ColorCodeMatrix>>;
  setNumRowsFilled: React.Dispatch<React.SetStateAction<number>>;
  colorCode: BlockColorCode;
}

function solidifyBlock(
  matrix: ColorCodeMatrix,
  blockVectors: BlockVectors,
  colorCode: BlockColorCode
): ColorCodeMatrix {
  const newMatrix = copyMatrix(matrix);

  blockVectors.map(([y, x]) => {
    if (isOnBoard([y, x])) {
      newMatrix[y][x] = colorCode;
    }
  });

  return newMatrix;
}

function handleBlockSettle({
  blockVectors,
  staticBlocksMatrix,
  setStaticBlocksMatrix,
  setNumRowsFilled,
  colorCode,
}: HandleBlockSettle) {
  const newStaticMatrix = solidifyBlock(
    staticBlocksMatrix,
    blockVectors,
    colorCode
  ).reduce((acc: ColorCodeMatrix, row: BlockColorCode[]) => {
    const currentRow = pruneRow(row);

    if (currentRow) {
      acc.push(currentRow);
    } else {
      setNumRowsFilled((prev) => prev + 1);
      acc.unshift(createRow(BOARD_DIMENSIONS.WIDTH));
    }

    return acc;
  }, []);

  setStaticBlocksMatrix(newStaticMatrix);
}

export { handleBlockSettle };
