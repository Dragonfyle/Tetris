import Square from "$components/Square/Square";
import { mergeActiveBlockWithMatrix } from "$components/GameBoard/GameBoard.utils";
import {
  ColorCodeMatrix,
  BlockVectors,
  BlockColorCode,
} from "$types/typeCollection";

function renderSquares(
  staticBlocksMatrix: ColorCodeMatrix,
  blockVectors: BlockVectors,
  colorCode: BlockColorCode
) {
  const rowLength = staticBlocksMatrix[0].length;
  const numSquares = staticBlocksMatrix.length * rowLength;
  const componentArray = [];
  const readyToRender = mergeActiveBlockWithMatrix(
    staticBlocksMatrix,
    blockVectors,
    colorCode
  );

  for (let i = 0; i < numSquares; i++) {
    componentArray.push(
      <Square
        key={Math.random()}
        colorCode={readyToRender[Math.floor(i / rowLength)][i % rowLength]}
      />
    );
  }
  return componentArray;
}

export { renderSquares };
