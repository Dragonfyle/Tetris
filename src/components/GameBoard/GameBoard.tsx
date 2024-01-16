import { useState } from "react";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BOARD_DIMENSIONS } from "../../config/board";
import { INITIAL_INTERVAL } from "../../config/initialSettings";
import createMatrix from "../../utils/gameBoardMatrix";
import useKeyboardControls from "../../hooks/useKeyboardControls";
import useFallingBlock from "../../hooks/useFallingBlock";

export interface BlockPositionProps {
  x: number;
  y: number;
}

export default function GameBoard() {
  const [staticBlocksMatrix, setStaticBlocksMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
  const [blockPosition, setBlockPosition] = useState({
    x: 5,
    y: 0,
  });
  const [fallingInterval, setFallingInterval] = useState(INITIAL_INTERVAL);

  function solidifyBlock() {
    setStaticBlocksMatrix((prev) => {
      const newMatrix = JSON.parse(JSON.stringify(prev));
      newMatrix[blockPosition.y][blockPosition.x] = true;
      return newMatrix;
    });
  }

  const isBlockedUnder =
    blockPosition.y === BOARD_DIMENSIONS.HEIGHT - 1 ||
    staticBlocksMatrix[blockPosition.y + 1][blockPosition.x];

  useFallingBlock({
    blockPosition,
    setBlockPosition,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedUnder,
    solidifyBlock,
    fallingInterval,
  });
  useKeyboardControls(setBlockPosition, setFallingInterval);

  function createReadyToRender() {
    const readyToRender = JSON.parse(JSON.stringify(staticBlocksMatrix));
    readyToRender[blockPosition.y][blockPosition.x] = true;

    return readyToRender;
  }

  function renderSquares() {
    const componentArray = [];
    const readyToRender = createReadyToRender();

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
