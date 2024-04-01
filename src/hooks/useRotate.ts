import { useCallback, useEffect, useState } from "react";
import { getNextRotation, translateBlockPosition } from "$utils/block/block";
import { isRotationPossible } from "$components/GameBoard/GameBoard.utils";
import {
  Vector,
  ColorCodeMatrix,
  RenderableBlockDefinition,
} from "$types/typeCollection";
import { useAppDispatch, useAppSelector } from "$utils/typedReduxHooks";
import { selectBlock, setNextRotation } from "$store/blockQueueSlice";

interface useRotateProps {
  definition: RenderableBlockDefinition;
  staticMatrix: ColorCodeMatrix;
  hookLocation: Vector;
}

export default function useRotate({
  definition,
  staticMatrix,
  hookLocation,
}: useRotateProps) {
  const {
    currentBlock: { activeRotationIdx },
  } = useAppSelector((state) => selectBlock(state));
  const dispatch = useAppDispatch();
  const [isDown, setIsDown] = useState(false);

  const nextRotationIdx = {
    clockwise: getNextRotation(activeRotationIdx),
    counterclockwise: getNextRotation(activeRotationIdx),
  };

  const nextRotations = {
    clockwise: definition.rotations[nextRotationIdx.clockwise],
    counterclockwise: definition.rotations[nextRotationIdx.counterclockwise],
  };

  const translatedRotations = {
    clockwise: translateBlockPosition({
      blockVectors: nextRotations.clockwise,
      offset: hookLocation,
    }),
    counterclockwise: translateBlockPosition({
      blockVectors: nextRotations.counterclockwise,
      offset: hookLocation,
    }),
  };

  const canRotate = {
    clockwise: isRotationPossible(translatedRotations.clockwise, staticMatrix),
    counterclockwise: isRotationPossible(
      translatedRotations.counterclockwise,
      staticMatrix
    ),
  };

  const keyboardListener = useCallback(
    (e: KeyboardEvent) => {
      const supportedKeys = {
        SPACE: " ",
      };
      const isKeySupported = Object.values(supportedKeys).includes(e.key);

      function handleRotate() {
        if (!isDown) {
          setIsDown(true);
          if (canRotate.clockwise) {
            dispatch(setNextRotation());
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
    [canRotate.clockwise, isDown, dispatch]
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
