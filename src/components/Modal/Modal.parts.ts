import styled from "styled-components";

export const StyledDialog = styled.dialog`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 150px;
  padding: 20px;
  border: 1px solid black;
  outline: 0;
  border-radius: 5px;
  background-color: lightblue;
  transform: translate(-50%, -120%);
  span:first-child {
    display: flex;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 32px;
    font-weight: bold;
  }

  span:nth-child(2) {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }

  &::backdrop {
    background-color: transparent;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
