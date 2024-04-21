import { BlockVectors } from "$types/typeCollection.ts";
import { BlockColorCode, ColorCodeMatrix } from "$types/typeCollection.ts";
import { copyMatrix, createRow } from "./matrix";
import { isOnBoard, pruneRow } from "$components/GameBoard/GameBoard.utils";
import { BOARD_DIMENSIONS } from "$config/board";
import { Dispatch } from "@reduxjs/toolkit";
import {
  incrementRowsFilled,
  increment4rowsCount,
} from "$store/rowsFilledSlice";
import { updateMatrix } from "$store/matrixSlice";

interface HandleBlockSettle {
  blockVectors: BlockVectors;
  staticMatrix: ColorCodeMatrix;
  colorCode: BlockColorCode;
  dispatch: Dispatch;
}

interface Accumulator {
  newStaticMatrix: ColorCodeMatrix;
  rowsCleared: 0 | 1 | 2 | 3 | 4;
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
  staticMatrix,
  colorCode,
  dispatch,
}: HandleBlockSettle) {
  const { newStaticMatrix, rowsCleared } = solidifyBlock(
    staticMatrix,
    blockVectors,
    colorCode
  ).reduce(
    (acc: Accumulator, row: BlockColorCode[]) => {
      const currentRow = pruneRow(row);

      if (currentRow) {
        acc.newStaticMatrix.push(currentRow);
      } else {
        acc.rowsCleared += 1;
        dispatch(incrementRowsFilled());
        acc.newStaticMatrix.unshift(createRow(BOARD_DIMENSIONS.WIDTH));
      }

      return acc;
    },
    { newStaticMatrix: [], rowsCleared: 0 }
  );

  if (rowsCleared === 4) {
    dispatch(increment4rowsCount());
  }
  dispatch(updateMatrix(newStaticMatrix));
}

export { handleBlockSettle };
