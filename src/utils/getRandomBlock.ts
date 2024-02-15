import {
  BlockName,
  renderableBlockList,
  translateCoordsToSpawnPos,
} from "./block/block";
import { BLOCK_DEFINITIONS } from "../data/blockData";

function getRandomBlock() {
  const blockNames = Object.keys(BLOCK_DEFINITIONS) as BlockName[];
  const numBlocks = blockNames.length;
  const randomNumber = Math.floor(Math.random() * numBlocks);

  return blockNames[randomNumber];
}

export default function createNewBlock() {
  const block = getRandomBlock();
  return translateCoordsToSpawnPos(renderableBlockList[block]);
}
