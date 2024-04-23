import { useCallback, useEffect, useRef } from "react";
import { GameBoardProps } from "./GameBoard.types";
import { useAppSelector, useAppDispatch } from "$utils/typedReduxHooks";
import { selectIsRunning, run, endRun } from "$store/runningSlice";
import { reset4rowsCount, resetRowsFilled } from "$store/rowsFilledSlice";
import useMovement from "$hooks/useMovement";
import useFallingBlock from "$hooks/useFallingBlock";
import useRotate from "$hooks/useRotate";
import { renderSquares } from "$utils/renderSquares";
import { getMovePossibilities } from "./GameBoard.utils";
import { translateBlockPosition } from "$utils/block/block";
import * as P from "./GameBoard.parts";
import Modal from "$components/Modal/Modal";
import { writeScoreToFirebase } from "$utils/firebaseReadWrite";
import {
  getNextBlock,
  selectBlock,
  resetHookLocation,
} from "$store/blockSlice";
import { clearMatrix, selectMatrix } from "$store/matrixSlice";
import { resetFallInterval } from "$store/fallIntervalSlice";

export default function GameBoard({ score }: GameBoardProps) {
  const { isRunning } = useAppSelector((state) => selectIsRunning(state));
  const {
    currentBlock: { definition, hookLocation, activeRotationIdx },
  } = useAppSelector((state) => selectBlock(state));
  const { staticMatrix } = useAppSelector((state) => selectMatrix(state));
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isFirstGame = useRef(true);
  const blockVectors = translateBlockPosition({
    blockVectors: definition.rotations[activeRotationIdx],
    offset: hookLocation,
  });

  useRotate({
    definition,
    staticMatrix,
  });

  const canMove = getMovePossibilities(
    ["left", "right", "down"],
    blockVectors,
    staticMatrix
  );

  useMovement({
    canMoveLeft: canMove.left,
    canMoveRight: canMove.right,
  });

  function handleGameOver() {
    dispatch(endRun());
    dialogRef.current?.showModal();
    writeScoreToFirebase(score);
  }

  useFallingBlock({
    canMoveDown: canMove.down,
    blockVectors,
    onGameOver: handleGameOver,
  });

  const startGame = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== " " || isRunning) return;

      if (!isFirstGame.current) {
        dispatch(resetRowsFilled());
        dispatch(reset4rowsCount());
        dispatch(clearMatrix());
        dispatch(resetHookLocation());
        dispatch(resetFallInterval());
      }

      dispatch(getNextBlock());
      dialogRef?.current?.close();
      dispatch(run());

      isFirstGame.current = false;
    },
    [isRunning, dispatch]
  );
  useEffect(() => {
    if (isRunning) return;

    document.addEventListener("keydown", startGame);

    return () => document.removeEventListener("keydown", startGame);
  }, [startGame, isRunning]);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const renderableMatrix = renderSquares(
    staticMatrix,
    blockVectors,
    definition.colorCode
  );

  return (
    <P.Wrapper>
      <P.Board>{renderableMatrix}</P.Board>
      <Modal ref={dialogRef} isFirstGame={isFirstGame.current} />
    </P.Wrapper>
  );
}
