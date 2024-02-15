import {
  BlockName,
  PrimitiveBlockDefinitions,
  RenderableBlockList,
  translateCoordsToSpawnPos,
} from "./block/block";
import { BLOCK_DEFINITIONS } from "../data/blockData";

function getRandomNumber(low: number = 0, high: number = 1) {
  return Math.floor(Math.random() * high) + low;
}

function getRandomBlockName(blockDefinitions: PrimitiveBlockDefinitions) {
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
  // const blockAtSpawn = translateCoordsToSpawnPos(renderableBlock);
}
