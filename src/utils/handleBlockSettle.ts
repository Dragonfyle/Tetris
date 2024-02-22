import { BlockVectors } from "$types/typeCollection.ts";
import { BinaryElement, BinaryMatrix } from "$types/typeCollection.ts";
import { createRow } from "./matrix";
import { pruneRow } from "$components/GameBoard/GameBoard.utils";
import { BOARD_DIMENSIONS } from "$config/board";

interface HandleBlockSettle {
  blockVectors: BlockVectors;
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<BinaryMatrix>>;
}

function solidifyBlock(
  matrix: BinaryMatrix,
  blockVectors: BlockVectors
): BinaryMatrix {
  const newMatrix = JSON.parse(JSON.stringify(matrix));

  blockVectors.map(([y, x]) => {
    newMatrix[y][x] = true;
  });

  return newMatrix;
}

function handleBlockSettle({
  blockVectors,
  setStaticBlocksMatrix,
}: HandleBlockSettle) {
  setStaticBlocksMatrix((prev) => {
    const newStaticMatrix = solidifyBlock(prev, blockVectors).reduce(
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
