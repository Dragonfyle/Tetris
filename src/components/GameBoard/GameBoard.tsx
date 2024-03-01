import { useCallback, useRef, useState } from "react";
import { BOARD_DIMENSIONS } from "$config/board";
import { INITIAL_INTERVAL, SPAWN_LOCATION } from "$config/initialSettings";
import useMovement from "$hooks/useMovement";
import useFallingBlock from "$hooks/useFallingBlock";
import useRotate from "$hooks/useRotate";
import getRenderableBlock from "$utils/getRandomBlock";
import { createMatrix } from "$utils/matrix";
import {
  calculateFallInterval,
  createReadyToRender,
  getMovePossibilities,
} from "./GameBoard.utils";
import {
  renderableBlockList,
  translateBlockPosition,
} from "$utils/block/block";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BlockVectors } from "$types/globalTypes";
import { handleBlockSettle } from "$utils/handleBlockSettle";

export default function GameBoard() {
  const [staticBlocksMatrix, setStaticBlocksMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
  const [numRowsFilled, setNumRowsFilled] = useState(0);
  const [activeBlock, setActiveBlock] = useState(
    getRenderableBlock(renderableBlockList)
  );
  const [hookLocation, setHookLocation] = useState(SPAWN_LOCATION);
  const activeRotationIdx = useRotate({
    activeBlock,
    staticBlocksMatrix,
    hookLocation,
  });
  const blockVectors = useRef<BlockVectors>(
    translateBlockPosition({
      BlockVectors: activeBlock.rotations[activeRotationIdx],
      offset: hookLocation,
    })
  );

  blockVectors.current = translateBlockPosition({
    BlockVectors: activeBlock.rotations[activeRotationIdx],
    offset: hookLocation,
  });

  const canMove = getMovePossibilities(
    ["left", "right", "down"],
    blockVectors.current,
    staticBlocksMatrix
  );

  const resetHookLocation = useCallback(
    function resetHookLocation() {
      setHookLocation(SPAWN_LOCATION);
    },
    [setHookLocation]
  );

  function handleEndFall() {
    handleBlockSettle({
      blockVectors: blockVectors.current,
      staticBlocksMatrix,
      setStaticBlocksMatrix,
      setNumRowsFilled,
    });
    resetHookLocation();
  }

  const speedupFactor = useMovement({
    setHookLocation,
    canMoveLeft: canMove.left,
    canMoveRight: canMove.right,
  });

  const fallInterval = calculateFallInterval(
    INITIAL_INTERVAL,
    speedupFactor,
    numRowsFilled
  );
  console.log(fallInterval);

  useFallingBlock({
    handleEndFall,
    setActiveBlock,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    canMoveDown: canMove.down,
    fallInterval,
  });

  function renderSquares() {
    const componentArray = [];
    const readyToRender = createReadyToRender(
      staticBlocksMatrix,
      blockVectors.current
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
