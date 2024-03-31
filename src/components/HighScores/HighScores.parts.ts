import styled from "styled-components";

export const HighScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  font-family: "Tektur", sans-serif;
  color: oldlace;

  p {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    font-size: 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
    font-size: 20px;
    padding-top: 60px;

    li {
      display: flex;
      justify-content: center;
    }
  }
`;
