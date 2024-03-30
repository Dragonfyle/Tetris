import styled from "styled-components";
import { getBlockColor } from "./Square.utils";
import { StyledSquareProps } from "./Square.types";

export const Square = styled.div<StyledSquareProps>`
  position: relative;
  width: 33px;
  height: 33px;
  background: ${getBlockColor};
  border-radius: 6%;
  box-sizing: border-box;

  &::before {
    content: "";
    width: calc(100% - 7px);
    height: calc(100% - 7px);
    position: absolute;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #111;
    border-radius: 15%;
  }
`;
