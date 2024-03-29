import Square from "$components/Square/Square";
import { mergeActiveBlockWithMatrix } from "$components/GameBoard/GameBoard.utils";
import { BinaryMatrix, BlockVectors } from "$types/globalTypes";

function renderSquares(
  staticBlocksMatrix: BinaryMatrix,
  blockVectors: BlockVectors
) {
  const rowLength = staticBlocksMatrix[0].length;
  const numSquares = staticBlocksMatrix.length * rowLength;
  const componentArray = [];
  const readyToRender = mergeActiveBlockWithMatrix(
    staticBlocksMatrix,
    blockVectors
  );

  for (let i = 0; i < numSquares; i++) {
    componentArray.push(
      <Square
        key={Math.random()}
        filled={readyToRender[Math.floor(i / rowLength)][i % rowLength]}
      />
    );
  }
  return componentArray;
}

export { renderSquares };
