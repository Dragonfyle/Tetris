import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BlockVectors } from "$types/globalTypes";
import { GameBoardProps } from "./GameBoard.types";
import { BOARD_DIMENSIONS } from "$config/board";
import { INITIAL_INTERVAL, SPAWN_LOCATION } from "$config/initialSettings";
import useMovement from "$hooks/useMovement";
import useFallingBlock from "$hooks/useFallingBlock";
import useRotate from "$hooks/useRotate";
import GameOver from "$components/GameOver/GameOver";
import HowToStart from "$components/HowToStart/HowToStart";
import getRenderableBlock from "$utils/getRandomBlock";
import { createMatrix } from "$utils/matrix";
import { renderSquares } from "$utils/renderSquares";
import {
  calculateFallInterval,
  getMovePossibilities,
  isOnBoard,
} from "./GameBoard.utils";
import {
  renderableBlockList,
  translateBlockPosition,
} from "$utils/block/block";
import { handleBlockSettle } from "$utils/handleBlockSettle";
import * as P from "./GameBoard.parts";

export default function GameBoard({
  numRowsFilled,
  setNumRowsFilled,
  isRunning,
  setIsRunning,
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
        setIsRunning(false);
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
    isRunning,
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
    isRunning,
  });

  const restartGame = useCallback(
    function startGame(e: KeyboardEvent) {
      if (e.key !== " " || isRunning) return;

      setIsRunning(true);
      dialogRef?.current?.close();
      setStaticBlocksMatrix(
        createMatrix(BOARD_DIMENSIONS.WIDTH, BOARD_DIMENSIONS.HEIGHT)
      );
      setHookLocation(SPAWN_LOCATION);
      setActiveBlock(getRenderableBlock(renderableBlockList));
      setNumRowsFilled(0);
    },
    [isRunning, setIsRunning, setNumRowsFilled]
  );

  useEffect(() => {
    document.addEventListener("keydown", restartGame);

    return () => document.removeEventListener("keydown", restartGame);
  }, [restartGame]);

  const renderableMatrix = renderSquares(
    staticBlocksMatrix,
    blockVectors.current
  );

  return (
    <P.Wrapper>
      {!isRunning && <HowToStart />}
      <P.Board>{renderableMatrix}</P.Board>
      {createPortal(<GameOver ref={dialogRef} />, document.body)}
    </P.Wrapper>
  );
}
