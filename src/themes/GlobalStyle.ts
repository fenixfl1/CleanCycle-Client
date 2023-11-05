import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Playfair Sans';
        src: local('Playfair Sans'), local('PlayfairSans'),
            url('/assets/fonts/PlayfairSans-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    body {
        font-family: 'Roboto', sans-serif;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.baseBgColor};
    }

    .main-page-header {
        background: ${({ theme }) => theme.secondaryColor} !important;
        position: 'relative';
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: ${({ theme }) => theme.borderRadius} !important;
        box-shadow: ${({ theme }) => theme.boxShadow} !important;
        margin: 20px;
    }

    iframe {
        box-shadow: ${({ theme }) => theme.boxShadow} !important;
        border: none;
        outline: none;
    }

    pre {
        border-radius: ${({ theme }) => theme.borderRadius} !important;
    }
`

export default GlobalStyle
