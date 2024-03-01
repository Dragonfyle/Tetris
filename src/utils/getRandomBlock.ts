import type {
  BlockName,
  BlockDefinitions,
  RenderableBlockList,
} from "$types/typeCollection";
import { BLOCK_DEFINITIONS } from "$data/blockData";

function getRandomNumber(low: number = 0, high: number = 1) {
  return Math.floor(Math.random() * high) + low;
}

function getRandomBlockName(blockDefinitions: BlockDefinitions) {
  const blockNames = Object.keys(blockDefinitions) as BlockName[];
  const numBlocks = blockNames.length;
  const randomNumber = getRandomNumber(0, numBlocks);

  return blockNames[randomNumber];
}

export default function getRenderableBlock(
  renderableBlocks: RenderableBlockList
) {
  const block = getRandomBlockName(BLOCK_DEFINITIONS);
  return renderableBlocks[block];
}
