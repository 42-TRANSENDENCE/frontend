import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    --color-blue: #4495F7;
    --color-red: #F36A7B;
    --color-green: #64E469;
    --color-yellow: #FCF451;
    --color-gray: #D9D9D9;
  }
  body {
    background: var(--color-blue);
    color: black;
    font-family: 'Poppins', sans-serif;
  }
`

export default GlobalStyles
