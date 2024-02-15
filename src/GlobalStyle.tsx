import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
`;

export default GlobalStyle;