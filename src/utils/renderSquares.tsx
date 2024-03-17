import { Square } from "$components/GameBoard/GameBoard.parts";
import { mergeActiveBlockWithMatrix } from "$components/GameBoard/GameBoard.utils";
import { BinaryMatrix, BlockVectors } from "$types/globalTypes";

function renderSquares(
  staticBlocksMatrix: BinaryMatrix,
  blockVectors: BlockVectors
) {
  const componentArray = [];
  const readyToRender = mergeActiveBlockWithMatrix(
    staticBlocksMatrix,
    blockVectors
  );

  for (let i = 0; i < 200; i++) {
    componentArray.push(
      <Square
        key={Math.random()}
        $filled={readyToRender[Math.floor(i / 10)][i % 10]}
      />
    );
  }
  return componentArray;
}

export { renderSquares };
