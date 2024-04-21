function calculateScore(numRowsFilled: number, num4rows: number) {
  return numRowsFilled * 100 + num4rows * 400;
}

export { calculateScore };
