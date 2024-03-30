import { BlockVectors } from "$types/typeCollection";
import { createMatrix } from "$utils/matrix";
import { renderSquares } from "$utils/renderSquares";
import * as P from "./NextBlock.parts";
import { NextBlockProps } from "./NextBlock.types";

const WIDTH = 3;
const HEIGHT = 4;

export default function NextBlock({
  nextBlockVectors,
  colorCode,
}: NextBlockProps) {
  const emptyMatrix = createMatrix(WIDTH, HEIGHT);

  function normalizeVectors(blockVectors: BlockVectors) {
    const minX = Math.min(...blockVectors.map(([, x]) => x));
    const minY = Math.min(...blockVectors.map(([y]) => y));
    const offsetX = minX;
    const offsetY = minY;

    return blockVectors.map(([y, x]) => [
      y - offsetY,
      x - offsetX,
    ]) as BlockVectors;
  }

  return (
    <P.NextBlockWrapper>
      <P.NextBlock>
        {renderSquares(
          emptyMatrix,
          normalizeVectors(nextBlockVectors),
          colorCode
        )}
      </P.NextBlock>
    </P.NextBlockWrapper>
  );
}
