import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Tektur';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/tektur/v3/XoH62YHtS7q969kXCjzlV0aSkS_o8OacszucvA.woff2) format('woff2');
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
`;
