import { selectBlock } from "$store/blockQueueSlice";
import { BlockVectors } from "$types/typeCollection";
import { INITIAL_ROTATION_IDX } from "$utils/block/block";
import { createMatrix } from "$utils/matrix";
import { renderSquares } from "$utils/renderSquares";
import { useAppSelector } from "$utils/typedReduxHooks";
import * as P from "./NextBlock.parts";

const WIDTH = 3;
const HEIGHT = 4;

export default function NextBlock() {
  const {
    nextBlock: { definition },
  } = useAppSelector((state) => selectBlock(state));
  const blockVectors = definition.rotations[INITIAL_ROTATION_IDX];
  const colorCode = definition.colorCode;
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
        {renderSquares(emptyMatrix, normalizeVectors(blockVectors), colorCode)}
      </P.NextBlock>
    </P.NextBlockWrapper>
  );
}
