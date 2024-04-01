import { BlockVectors } from "$types/typeCollection.ts";
import { BlockColorCode, ColorCodeMatrix } from "$types/typeCollection.ts";
import { copyMatrix, createRow } from "./matrix";
import { isOnBoard, pruneRow } from "$components/GameBoard/GameBoard.utils";
import { BOARD_DIMENSIONS } from "$config/board";
import { Dispatch } from "@reduxjs/toolkit";
import { incrementRowsFilled } from "$store/rowsFilledSlice";
import { updateMatrix } from "$store/matrixSlice";

interface HandleBlockSettle {
  blockVectors: BlockVectors;
  staticMatrix: ColorCodeMatrix;
  colorCode: BlockColorCode;
  dispatch: Dispatch;
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
  const newStaticMatrix = solidifyBlock(
    staticMatrix,
    blockVectors,
    colorCode
  ).reduce((acc: ColorCodeMatrix, row: BlockColorCode[]) => {
    const currentRow = pruneRow(row);

    if (currentRow) {
      acc.push(currentRow);
    } else {
      dispatch(incrementRowsFilled());
      acc.unshift(createRow(BOARD_DIMENSIONS.WIDTH));
    }

    return acc;
  }, []);

  dispatch(updateMatrix(newStaticMatrix));
}

export { handleBlockSettle };
