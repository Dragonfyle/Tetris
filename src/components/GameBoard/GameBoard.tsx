import { Wrapper, Board, Square } from "./GameBoard.parts";
import createMatrix from "../../utils/gameBoardMatrix";
import { useState, useEffect } from "react";
import useKeyboardControls from "../../hooks/useKeyboardControls";

export interface BlockPositionProps {
  x: number;
  y: number;
}

const BOARD_DIMENSIONS = {
  WIDTH: 10,
  HEIGHT: 20,
};

export default function GameBoard() {
  const [boardMatrix, setBoardMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
  const [blockPosition, setBlockPosition] = useState({
    x: 5,
    y: 0,
  });

  useEffect(() => {
    const fallingInterval = setInterval(() => {
      setBlockPosition((prevPos) => {
        return { ...prevPos, y: prevPos.y + 1 };
      });
    }, 1000);

    return () => clearInterval(fallingInterval);
  }, []);

  function createReadyToRender() {
    const readyToRender = JSON.parse(JSON.stringify(boardMatrix));
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
