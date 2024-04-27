import styled from "styled-components";

const ArrowKey = styled.div`
  height: 40px;
  width: 40px;
  border: 5px solid white;
`;

export const LeftArrow = styled(ArrowKey)`
  grid-area: 4 / 11 / 5 / 12;
`;
export const DownArrow = styled(ArrowKey)`
  grid-area: 4 / 12 / 5 / 13;
`;
export const RightArrow = styled(ArrowKey)`
  grid-area: 4 / 13 / 5 / 14;
`;
export const UpArrow = styled(ArrowKey)`
  grid-area: 3 / 12 / 4 / 13;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

export const Spacebar = styled.div`
  height: 40px;
  width: 300px;
  border: 5px solid white;
  grid-area: 4 / 1 / 5 / 9;
`;
