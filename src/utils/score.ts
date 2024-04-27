import { SINGLE_ROW_SCORE, TETRIS_ADD_SCORE } from "$config/initialSettings";

function calculateScore(numRowsFilled: number, num4rows: number) {
  return numRowsFilled * SINGLE_ROW_SCORE + num4rows * TETRIS_ADD_SCORE;
}

export { calculateScore };
