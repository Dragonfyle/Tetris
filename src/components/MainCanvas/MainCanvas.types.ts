interface MainCanvasProps {
  score: number;
  numRowsFilled: number;
  setNumRowsFilled: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { MainCanvasProps };
