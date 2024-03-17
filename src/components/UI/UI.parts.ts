import styled from "styled-components";

export const Wrapper = styled.div<{ $justify: string }>`
  display: flex;
  width: 33%;
  justify-content: ${({ $justify }) => $justify};
  align-items: center;
  height: 700px;
  padding: 30px;
`;

export const StatsColumn = styled.section`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 85%;
  background-color: gray;
`;
