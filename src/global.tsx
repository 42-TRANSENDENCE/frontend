import { createGlobalStyle } from "styled-components";
import pongBackgroundGray from "./assets/pongBackgroundGray.svg";

const GlobalStyles = createGlobalStyle`
  html {
    --color-blue: #4495F7;
    --color-red: #F36A7B;
    --color-green: #64E469;
    --color-yellow: #FCF451;
    --color-gray: #D9D9D9;
    --html-padding-horizontal: min(25px, 2.5vw);
    --html-padding-vertical: min(25px, 2.5vh);

    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;

    box-sizing: border-box;
    background-image: url(${pongBackgroundGray});
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: var(--html-padding-vertical) var(--html-padding-horizontal);
    overflow: hidden;
  }
  body {
    --page-width : min(1920px, calc(100vw - 2*var(--html-padding-horizontal)));
    --page-height : calc(100vh - 2*var(--html-padding-vertical));

    --title-width: calc(var(--page-width) * 0.90);
    --title-height : calc(var(--title-width) * (8 / 180));
    
    --body-width: var(--title-width);
    --body-height: calc(var(--page-height) - 1*var(--title-height) - 3*var(--html-padding-vertical));
    --border-width: min(5px, calc(var(--body-width) * 8 / 1800));
  
    width: var(--page-width);
    height: var(--page-height);
    background: var(--color-blue);
    color: black;
    font-family: 'Rajdhani', sans-serif;
    border-radius: calc(min(var(--page-height), var(--page-width)) * 0.05);
    overflow: hidden;
  }
`;

export default GlobalStyles;
