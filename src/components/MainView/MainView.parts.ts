import styled from "styled-components";

export const View = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #282828;
  width: 100vw;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 3fr 1.4fr;
`;
