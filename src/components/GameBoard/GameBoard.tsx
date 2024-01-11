import { Wrapper, Board, Square } from "./GameBoard.parts";

function renderSquares() {
  const componentArray = [];

  for (let i = 0; i < 200; i++) {
    componentArray.push(<Square />);
  }
  return componentArray;
}

export default function GameBoard() {
  return (
    <Wrapper>
      <Board>{renderSquares()}</Board>
    </Wrapper>
  );
}
