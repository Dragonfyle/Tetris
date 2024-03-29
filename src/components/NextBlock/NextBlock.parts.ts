import styled from "styled-components";

export const NextBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const NextBlock = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;
