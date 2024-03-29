import { BlockVectors } from "$types/globalTypes";
import { createMatrix } from "$utils/matrix";
import { renderSquares } from "$utils/renderSquares";
import * as P from "./NextBlock.parts";
import { NextBlockProps } from "./NextBlock.types";

const WIDTH = 3;
const HEIGHT = 4;

export default function NextBlock({ nextBlockVectors }: NextBlockProps) {
  const emptyMatrix = createMatrix(WIDTH, HEIGHT);

  function normalizeVectors(blockVectors: BlockVectors) {
    const minX = Math.min(...blockVectors.map(([, x]) => x));
    const minY = Math.min(...blockVectors.map(([y]) => y));
    const offsetX = minX;
    const offsetY = minY;

    console.log(blockVectors.map(([y, x]) => [y - offsetY, x - offsetX]));
    return blockVectors.map(([y, x]) => [
      y - offsetY,
      x - offsetX,
    ]) as BlockVectors;
  }

  return (
    <P.NextBlockWrapper>
      <P.NextBlock>
        {renderSquares(emptyMatrix, normalizeVectors(nextBlockVectors))}
      </P.NextBlock>
    </P.NextBlockWrapper>
  );
}
