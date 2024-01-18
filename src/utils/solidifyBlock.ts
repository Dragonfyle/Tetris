import { blockCoords } from "../utils/globalTypes";

export function solidifyBlock(
  setStaticBlocksMatrix: React.Dispatch<React.SetStateAction<Array<boolean[]>>>,
  coords: blockCoords
) {
  setStaticBlocksMatrix((prev) => {
    const newMatrix = JSON.parse(JSON.stringify(prev));
    newMatrix[coords.y][coords.x] = true;
    return newMatrix;
  });
}
