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
