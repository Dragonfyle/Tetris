import styled from "styled-components";

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
