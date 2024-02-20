import { BlockVectors } from "../types/globalTypes";
import { BinaryElement, BinaryMatrix } from "../types/globalTypes";
import { createRow } from "./matrix";
import { pruneRow } from "../components/GameBoard/GameBoard.utils";
import { BOARD_DIMENSIONS } from "../config/board";

interface HandleBlockSettle {
  blockPosition: BlockVectors;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<BinaryMatrix>>;
}

function solidifyBlock(
  matrix: BinaryMatrix,
  blockPosition: BlockVectors
): BinaryMatrix {
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  blockPosition.map(([y, x]) => {
    newMatrix[y][x] = true;
  });

  return newMatrix;
}

function handleBlockSettle({
  blockPosition,
  setStaticBlocksMatrix,
}: HandleBlockSettle) {
  setStaticBlocksMatrix((prev) => {
    const newStaticMatrix = solidifyBlock(prev, blockPosition).reduce(
      (acc: BinaryMatrix, row: BinaryElement[]) => {
        const currentRow = pruneRow(row);

        if (currentRow) {
          acc.push(currentRow);
        } else {
          acc.unshift(createRow(BOARD_DIMENSIONS.WIDTH));
        }

        return acc;
      },
      []
    );
    return newStaticMatrix;
  });
}

export { handleBlockSettle };
