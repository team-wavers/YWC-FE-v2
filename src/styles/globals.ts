import { createGlobalStyle } from "styled-components";
import { resetCSS } from "./utils/reset";

const GlobalStyles = createGlobalStyle`
    ${resetCSS}
    * {
        box-sizing: border-box;
        font-family: "NanumSquareNeo", sans-serif;
    }

    html, body {
        margin: 0;
        width: 100%;
        height: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f1f2f4;
    }

    &:link, &:visited {
        text-decoration: none;
    }

    button {
        cursor: pointer;
    }

    b {
        font-size: inherit;
        color: inherit;
    }
`;

export default GlobalStyles;
