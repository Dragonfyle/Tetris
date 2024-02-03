import { BlockCoords } from "../utils/globalTypes";
import { GameBoardMatrix } from "./gameBoardMatrix";
import { pruneRow } from "./pruneRows";
import { BOARD_DIMENSIONS } from "../config/board";
import { createRow } from "./createMatrixRow";

function solidifyBlock(matrix: GameBoardMatrix, coords: BlockCoords) {
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  newMatrix[coords.y][coords.x] = true;

  return newMatrix;
}

export function handleBlockSettle(
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>,
  coords: BlockCoords
) {
  setStaticBlocksMatrix((prev) => {
    const newStaticMatrix = solidifyBlock(prev, coords).reduce((acc, row) => {
      const currentRow = pruneRow(row);
      if (currentRow) {
        acc.push(currentRow);
      } else {
        acc.unshift(createRow(BOARD_DIMENSIONS.WIDTH));
      }
      return acc;
    }, []);

    return newStaticMatrix;
  });
}
