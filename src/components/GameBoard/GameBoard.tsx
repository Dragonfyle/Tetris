import { useState } from "react";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BOARD_DIMENSIONS, BOARD_EDGE } from "../../config/board";
import { INITIAL_INTERVAL } from "../../config/initialSettings";
import createMatrix from "../../utils/gameBoardMatrix";
import useKeyboardControls from "../../hooks/useKeyboardControls";
import useFallingBlock from "../../hooks/useFallingBlock";
import { blockCoords } from "../../utils/globalTypes";

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
  const [fallInterval, setFallInterval] = useState(INITIAL_INTERVAL);

  const isSquareOccupied = {
    left: staticBlocksMatrix[blockPosition.y]?.[blockPosition.x - 1],
    right: staticBlocksMatrix[blockPosition.y]?.[blockPosition.x + 1],
    down: staticBlocksMatrix[blockPosition.y + 1]?.[blockPosition.x],
  };
  const isBlocked = {
    under: blockPosition.y === BOARD_EDGE.BOTTOM || isSquareOccupied.down,
    left: blockPosition.x === BOARD_EDGE.LEFT || isSquareOccupied.left,
    right: blockPosition.x === BOARD_EDGE.RIGHT || isSquareOccupied.right,
  };

  useFallingBlock({
    blockPosition,
    setBlockPosition,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedUnder: isBlocked.under,
    // rearrangeRows,
    fallInterval,
  });
  useKeyboardControls({
    onKeyDown: setBlockPosition,
    setFallInterval,
    isBlockedLeft: isBlocked.left,
    isBlockedRight: isBlocked.right,
  });

  function createReadyToRender(
    staticBlocksMatrix: boolean[][],
    blockPosition: blockCoords
  ) {
    const readyToRender = JSON.parse(JSON.stringify(staticBlocksMatrix));
    readyToRender[blockPosition.y][blockPosition.x] = true;

    return readyToRender;
  }

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
