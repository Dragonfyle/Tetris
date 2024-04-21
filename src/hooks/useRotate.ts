import { useCallback, useEffect, useState } from "react";
import { getNextRotation, translateBlockPosition } from "$utils/block/block";
import { isRotationPossible } from "$components/GameBoard/GameBoard.utils";
import {
  ColorCodeMatrix,
  RenderableBlockDefinition,
  BlockVectors,
} from "$types/typeCollection";
import { useAppDispatch, useAppSelector } from "$utils/typedReduxHooks";
import {
  selectBlock,
  setNextRotation,
  updateHookLocation,
} from "$store/blockSlice";
import { BOARD_EDGE } from "$config/board";

interface useRotateProps {
  definition: RenderableBlockDefinition;
  staticMatrix: ColorCodeMatrix;
}

export default function useRotate({
  definition,
  staticMatrix,
}: useRotateProps) {
  const {
    currentBlock: { activeRotationIdx, hookLocation },
  } = useAppSelector((state) => selectBlock(state));
  const dispatch = useAppDispatch();
  const [isDown, setIsDown] = useState(false);

  const nextRotationIdx = getNextRotation(activeRotationIdx);

  const nextRotation = definition.rotations[nextRotationIdx];

  const translatedRotation = translateBlockPosition({
    blockVectors: nextRotation,
    offset: hookLocation,
  });

  function moveIfOutsideBoard(rotation: BlockVectors) {
    let offsetX = null;

    if (rotation.some(([, x]) => x < BOARD_EDGE.LEFT)) {
      offsetX = Math.min(...rotation.map(([, x]) => x));
    } else if (rotation.some(([, x]) => x > BOARD_EDGE.RIGHT)) {
      offsetX = Math.max(...rotation.map(([, x]) => x)) - BOARD_EDGE.RIGHT;
    }

    if (offsetX === null) return { vectors: rotation, offsetX };

    return {
      vectors: translateBlockPosition({
        blockVectors: rotation,
        offset: [0, -offsetX],
      }),
      offsetX,
    };
  }

  const movedRotation = moveIfOutsideBoard(translatedRotation);

  const canRotate = isRotationPossible(movedRotation.vectors, staticMatrix);

  const keyboardListener = useCallback(
    (e: KeyboardEvent) => {
      const supportedKeys = {
        SPACE: " ",
      };
      const isKeySupported = Object.values(supportedKeys).includes(e.key);

      function handleRotate() {
        if (!isDown) {
          setIsDown(true);

          if (canRotate) {
            dispatch(setNextRotation());
            movedRotation.offsetX &&
              dispatch(
                updateHookLocation([
                  hookLocation[0],
                  hookLocation[1] - movedRotation.offsetX,
                ])
              );
          }
        }
        if (e.type === "keyup") {
          setIsDown(false);
        }
      }

      if (isKeySupported) {
        e.preventDefault();
        e.stopPropagation();
        handleRotate();
      }
    },
    [canRotate, isDown, dispatch, hookLocation]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyboardListener);
    window.addEventListener("keyup", keyboardListener);

    return () => {
      window.removeEventListener("keydown", keyboardListener);
      window.removeEventListener("keyup", keyboardListener);
    };
  }, [keyboardListener]);
}
