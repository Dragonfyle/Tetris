import { BlockCoords } from "./block/block";
import { GameBoardMatrix } from "../components/GameBoard/GameBoard.utils";
import { createRow } from "../components/GameBoard/GameBoard.utils";
import { pruneRow } from "../components/GameBoard/GameBoard.utils";
import { BOARD_DIMENSIONS } from "../config/board";

function solidifyBlock(matrix: GameBoardMatrix, coords: BlockCoords) {
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  coords.map(([y, x]) => (newMatrix[y][x] = true));

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