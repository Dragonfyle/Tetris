import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 2.4px;
  width: 100%;
  border-left: 1px solid oldlace;
  border-right: 1px solid oldlace;
  background-color: #111;
  padding: 0 3px 0 3px;
`;

export const Square = styled.div<{ $filled: boolean }>`
  position: relative;
  width: 33px;
  height: 33px;
  background: ${({ $filled }) =>
    $filled
      ? "linear-gradient(130deg, rgba(255,0,0,1) 0%, rgba(250,142,0,1) 47%, rgba(227,152,0,1) 74%)"
      : "none"};
  border-radius: 1px;
  box-sizing: border-box;

  &::before {
    content: "";
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #111;
  }
`;
