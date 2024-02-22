import { useState } from "react";
import { BlockVectors } from "$types/typeCollection";
import { BOARD_DIMENSIONS } from "$config/board";
import { INITIAL_INTERVAL, SPAWN_LOCATION } from "$config/initialSettings";
import useMovement from "$hooks/useMovement";
import useFallingBlock from "$hooks/useFallingBlock";
import useRotate from "$hooks/useRotate";
import getRenderableBlock from "$utils/getRandomBlock";
import { createMatrix } from "$utils/matrix";
import { createReadyToRender, getMovePossibilities } from "./GameBoard.utils";
import {
  renderableBlockList,
  translateBlockPosition,
} from "$utils/block/block";
import { Wrapper, Board, Square } from "./GameBoard.parts";

export default function GameBoard() {
  const [staticBlocksMatrix, setStaticBlocksMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
  const [activeBlock, setActiveBlock] = useState(
    getRenderableBlock(renderableBlockList)
  );
  const [hookLocation, setHookLocation] = useState(SPAWN_LOCATION);
  const [fallInterval, setFallInterval] = useState(INITIAL_INTERVAL);

  const [activeRotation] = useRotate({
    activeBlock,
    staticBlocksMatrix,
    hookLocation,
  });

  const currentRotation = activeBlock.rotations[activeRotation];

  const blockVectors = translateBlockPosition({
    BlockVectors: currentRotation,
    offset: hookLocation,
  }) as BlockVectors;

  const canMove = getMovePossibilities(
    ["left", "right", "down"],
    blockVectors,
    staticBlocksMatrix
  );

  useFallingBlock({
    blockVectors,
    setActiveBlock,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    canMoveDown: canMove.down,
    fallInterval,
  });
  useMovement({
    setHookLocation,
    setFallInterval,
    canMoveLeft: canMove.left,
    canMoveRight: canMove.right,
  });

  function renderSquares() {
    const componentArray = [];
    const readyToRender = createReadyToRender(staticBlocksMatrix, blockVectors);

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

  return (
    <Wrapper>
      <Board>{renderSquares()}</Board>
    </Wrapper>
  );
}
