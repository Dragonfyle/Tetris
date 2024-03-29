import styled from "styled-components";

export const StyledDialog = styled.dialog`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 200px;
  outline: 0;
  border: 1px solid black;
  border-radius: 5px;
  background-color: lightblue;
  transform: translate(-50%, -50%);
  text-align: center;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    font-size: 50px;
    font-weight: bold;
  }

  &::backdrop {
    background-color: transparent;
  }
`;
