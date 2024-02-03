import { BOARD_DIMENSIONS } from "../config/board";
import { blockCoords } from "../utils/globalTypes";
import { createRow } from "./createMatrixRow";

export function solidifyBlock(
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>,
  coords: blockCoords
) {
  setStaticBlocksMatrix((prev) => {
    const rowToCheck = coords.y;
    let newMatrix = JSON.parse(JSON.stringify(prev));
    newMatrix[coords.y][coords.x] = true;

    if (!newMatrix[rowToCheck].every((column: boolean) => column)) {
      return newMatrix;
    } else {
      newMatrix = newMatrix.filter((row, idx) => idx !== rowToCheck);

      newMatrix.unshift(createRow(BOARD_DIMENSIONS.WIDTH));

      return newMatrix;
    }
  });
}
