import { useCallback, useEffect, useState } from "react";
import { getNextRotation, translateBlockPosition } from "$utils/block/block";
import { isRotationPossible } from "$components/GameBoard/GameBoard.utils";
import {
  Vector,
  BinaryMatrix,
  RenderableBlockDefinition,
  RotationIdx,
} from "$types/typeCollection";

interface useRotateProps {
  activeBlock: RenderableBlockDefinition;
  staticBlocksMatrix: BinaryMatrix;
  hookLocation: Vector;
}

export default function useRotate({
  activeBlock,
  staticBlocksMatrix,
  hookLocation,
}: useRotateProps) {
  const [isDown, setIsDown] = useState(false);
  const [activeRotation, setActiveRotation] = useState(0 as RotationIdx);

  const nextRotationIdx = {
    clockwise: getNextRotation("clockwise", activeRotation),
    counterclockwise: getNextRotation("counterclockwise", activeRotation),
  };

  const nextRotations = {
    clockwise: activeBlock.rotations[nextRotationIdx.clockwise],
    counterclockwise: activeBlock.rotations[nextRotationIdx.counterclockwise],
  };

  const translatedRotations = {
    clockwise: translateBlockPosition({
      BlockVectors: nextRotations.clockwise,
      offset: hookLocation,
    }),
    counterclockwise: translateBlockPosition({
      BlockVectors: nextRotations.counterclockwise,
      offset: hookLocation,
    }),
  };

  const canRotate = {
    clockwise: isRotationPossible(
      translatedRotations.clockwise,
      staticBlocksMatrix
    ),
    counterclockwise: isRotationPossible(
      translatedRotations.counterclockwise,
      staticBlocksMatrix
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
          setActiveRotation((prev) => {
            return canRotate.clockwise ? nextRotationIdx.clockwise : prev;
          });
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
    [nextRotationIdx.clockwise, canRotate.clockwise, isDown]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyboardListener);
    window.addEventListener("keyup", keyboardListener);

    return () => {
      window.removeEventListener("keydown", keyboardListener);
      window.removeEventListener("keyup", keyboardListener);
    };
  }, [keyboardListener]);

  return [activeRotation];
}
