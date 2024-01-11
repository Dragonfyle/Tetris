import styled from "styled-components";

export const Wrapper = styled.div<{ $justify: string }>`
  display: flex;
  width: 33%;
  justify-content: ${({ $justify }) => $justify};
  align-items: center;
  height: 700px;
  padding: 30px;
  background-color: #394;
`;

export const StatsColumn = styled.section`
  width: 150px;
  height: 85%;
  background-color: #444;
`;
