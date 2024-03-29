import styled from "styled-components";

export const UIColumn = styled.div<{ $justify: string }>`
  display: flex;
  justify-content: ${({ $justify }) => $justify};
  align-items: flex-start;
  background-color: #111;
  height: 100%;
  width: 100%;
`;
