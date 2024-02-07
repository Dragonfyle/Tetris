import { useState } from "react";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BOARD_DIMENSIONS } from "../../config/board";
import { INITIAL_INTERVAL } from "../../config/initialSettings";
import {
  createMatrix,
  isBoardEdge,
  isPositionOccupied,
  createReadyToRender,
} from "./GameBoard.utils";
import useKeyboardControls from "../../hooks/useKeyboardControls";
import useFallingBlock from "../../hooks/useFallingBlock";
import getRandomBlock from "../../utils/getRandomBlock";

export default function GameBoard() {
  const [staticBlocksMatrix, setStaticBlocksMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
  const [blockPosition, setBlockPosition] = useState(getRandomBlock());
  const [fallInterval, setFallInterval] = useState(INITIAL_INTERVAL);

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
    setBlockPosition,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedDown: isBlocked.down,
    fallInterval,
  });
  useKeyboardControls({
    onKeyDown: setBlockPosition,
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
