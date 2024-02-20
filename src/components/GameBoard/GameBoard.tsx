import { useState } from "react";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BOARD_DIMENSIONS } from "../../config/board";
import { INITIAL_INTERVAL, SPAWN_LOCATION } from "../../config/initialSettings";
import {
  isBoardEdge,
  isPositionOccupied,
  createReadyToRender,
} from "./GameBoard.utils";
import { createMatrix } from "../../utils/matrix";
import useMovement from "../../hooks/useMovement";
import useFallingBlock from "../../hooks/useFallingBlock";
import getRenderableBlock from "../../utils/getRandomBlock";
import {
  renderableBlockList,
  translateBlockPosition,
} from "../../utils/block/block";
import { BlockVectors } from "../../types/globalTypes";
import useRotate from "../../hooks/useRotate";

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

  const blockPosition = translateBlockPosition({
    BlockVectors: currentRotation,
    offset: hookLocation,
  }) as BlockVectors;

  const isSquareOccupied = {
    left: isPositionOccupied("left", blockPosition, staticBlocksMatrix),
    right: isPositionOccupied("right", blockPosition, staticBlocksMatrix),
    down: isPositionOccupied("down", blockPosition, staticBlocksMatrix),
  };

  const isBlocked = {
    left: isSquareOccupied.left || isBoardEdge("left", blockPosition),
    right: isSquareOccupied.right || isBoardEdge("right", blockPosition),
    down: isSquareOccupied.down || isBoardEdge("down", blockPosition),
  };

  useFallingBlock({
    blockPosition,
    setActiveBlock,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedDown: isBlocked.down,
    fallInterval,
  });
  useMovement({
    onKeyDown: setHookLocation,
    setFallInterval,
    isBlockedLeft: isBlocked.left,
    isBlockedRight: isBlocked.right,
  });

  function renderSquares() {
    const componentArray = [];
    const readyToRender = createReadyToRender(
      staticBlocksMatrix,
      blockPosition
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

  return (
    <Wrapper>
      <Board>{renderSquares()}</Board>
    </Wrapper>
  );
}
