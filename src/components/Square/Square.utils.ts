import { BLOCK_COLORS_MAP } from "$config/initialSettings";
import { getBlockColorProps } from "./Square.types";

function getBlockColor({ $colorCode }: getBlockColorProps) {
  switch ($colorCode) {
    case 0: {
      return "none";
    }
    default: {
      return `
      linear-gradient(130deg, ${BLOCK_COLORS_MAP[$colorCode]});
    `;
    }
  }
}

export { getBlockColor };
