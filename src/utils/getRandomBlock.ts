import { blockList, Block, translateCoordsToStartPos } from "./block/block";

export default function getRandomBlock() {
  const blockOptions = Object.keys(blockList) as Array<Block>;
  const numBlocks = blockOptions.length;
  const randomNumber = Math.floor(Math.random() * numBlocks);
  const key = blockOptions[randomNumber];

  return translateCoordsToStartPos(blockList[key].coordList);
}
