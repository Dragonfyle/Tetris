import { useState } from "react";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BOARD_DIMENSIONS, BOARD_EDGE } from "../../config/board";
import { INITIAL_INTERVAL } from "../../config/initialSettings";
import { GameBoardMatrix, createMatrix } from "./GameBoard.utils";
import useKeyboardControls from "../../hooks/useKeyboardControls";
import useFallingBlock from "../../hooks/useFallingBlock";
import { BlockCoords } from "../../utils/block/block";
import getRandomBlock from "../../utils/getRandomBlock";

export default function GameBoard() {
  const [staticBlocksMatrix, setStaticBlocksMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
  const [blockPosition, setBlockPosition] = useState(getRandomBlock());
  const [fallInterval, setFallInterval] = useState(INITIAL_INTERVAL);

  const isSquareOccupied = {
    left: blockPosition.some(([y, x]) => staticBlocksMatrix[y]?.[x - 1]),
    right: blockPosition.some(([y, x]) => staticBlocksMatrix[y]?.[x + 1]),
    down: blockPosition.some(([y, x]) => staticBlocksMatrix[y + 1]?.[x]),
  };
  const isBlocked = {
    under:
      isSquareOccupied.down ||
      blockPosition.some(([y, _]) => y === BOARD_EDGE.BOTTOM),
    left:
      isSquareOccupied.left ||
      blockPosition.some(([_, x]) => x === BOARD_EDGE.LEFT),
    right:
      isSquareOccupied.right ||
      blockPosition.some(([_, x]) => x === BOARD_EDGE.RIGHT),
  };

  useFallingBlock({
    blockPosition,
    setBlockPosition,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    isBlockedUnder: isBlocked.under,
    fallInterval,
  });
  useKeyboardControls({
    onKeyDown: setBlockPosition,
    setFallInterval,
    isBlockedLeft: isBlocked.left,
    isBlockedRight: isBlocked.right,
  });

  function createReadyToRender(
    staticBlocksMatrix: GameBoardMatrix,
    blockPosition: BlockCoords
  ) {
    const readyToRender = JSON.parse(JSON.stringify(staticBlocksMatrix));
    console.log(blockPosition);
    blockPosition.map(([y, x]) => (readyToRender[y][x] = true));

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
