interface MainCanvasProps {
  isGameOver: boolean;
  score: number;
  numRowsFilled: number;
  setNumRowsFilled: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { MainCanvasProps };
