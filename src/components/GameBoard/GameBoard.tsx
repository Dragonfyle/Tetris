import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  isOnBoard,
} from "./GameBoard.utils";
import {
  renderableBlockList,
  translateBlockPosition,
} from "$utils/block/block";
import { Wrapper, Board, Square } from "./GameBoard.parts";
import { BlockVectors } from "$types/globalTypes";
import { handleBlockSettle } from "$utils/handleBlockSettle";
import { GameBoardProps } from "./GameBoard.types";
import GameOver from "$components/GameOver/GameOver";

export default function GameBoard({
  numRowsFilled,
  isGameOver,
  setNumRowsFilled,
  setIsGameOver,
}: GameBoardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [staticBlocksMatrix, setStaticBlocksMatrix] = useState(
    createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
  );
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

  function handleEndFall(blockVectors: BlockVectors) {
    const isGameOver = blockVectors.some(([y, x]) => !isOnBoard([y, x]));

    return (fall: number, spawnBlock: () => void) => {
      if (isGameOver) {
        clearInterval(fall);
        setIsGameOver(true);
        dialogRef.current?.showModal();
      }
      handleBlockSettle({
        blockVectors: blockVectors,
        staticBlocksMatrix,
        setStaticBlocksMatrix,
        setNumRowsFilled,
      });
      spawnBlock();

      resetHookLocation();
    };
  }

  const endFallHandler = handleEndFall(blockVectors.current);

  const speedupFactor = useMovement({
    setHookLocation,
    canMoveLeft: canMove.left,
    canMoveRight: canMove.right,
    isGameOver,
  });

  const fallInterval = calculateFallInterval(
    INITIAL_INTERVAL,
    speedupFactor,
    numRowsFilled
  );

  useFallingBlock({
    endFallHandler,
    setActiveBlock,
    setHookLocation,
    staticBlocksMatrix,
    setStaticBlocksMatrix,
    canMoveDown: canMove.down,
    fallInterval,
    isGameOver,
    // setIsGameOver,
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
      {createPortal(<GameOver ref={dialogRef} />, document.body)}
    </Wrapper>
  );
}
