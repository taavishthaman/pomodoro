import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --color-primary: #F87070;
        --color-secondary: #70F3F8;
        --color-tertiary: #D881F8;
        --color-text-primary: #D7E0FF;
        --color-text-secondary: #1E213F;
        --color-background: #1E213F;
        --color-dark: #161932;
        --color-btn-background: #EFF1FA;
        --color-backdrop: rgba(10, 12, 28, 0.50);
        --color-white: #fff
    }

    *,
    *::before,
    *::after  {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        transition: all 0.3s;
    }

    html {
        font-size: 62.5%;
    }

    body {
        background-color: var(--color-background);
    }
`;

export default GlobalStyles;
