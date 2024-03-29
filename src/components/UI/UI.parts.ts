import styled from "styled-components";

export const Wrapper = styled.div<{ $justify: string }>`
  display: flex;
  justify-content: ${({ $justify }) => $justify};
  align-items: flex-start;
  background-color: #111;
  height: 100%;
  width: 100%;
`;

export const StatsColumn = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
