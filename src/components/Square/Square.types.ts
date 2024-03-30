import { BlockColorCode } from "$types/typeCollection";

interface SquareProps {
  colorCode: BlockColorCode;
}

interface getBlockColorProps {
  $colorCode: BlockColorCode;
}

interface StyledSquareProps {
  $colorCode: BlockColorCode;
}

export type { SquareProps, getBlockColorProps, StyledSquareProps };
