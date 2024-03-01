import { createGlobalStyle } from 'styled-components';

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

    @media all and (min-width: 320px) {
        .grid-gallery {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    @media all and (min-width: 768px) {
        .grid-gallery {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media all and (min-width: 1024px) {
        .grid-gallery {
            grid-template-columns: repeat(6, 1fr);
        }
    }

    .ant-image-preview-img {
        border-radius: ${({ theme }) => theme.borderRadius} !important;
    }

    .EmojiPickerReact {
        border: none !important;
    }

    .ant-image-mask {
        border-radius: ${({ theme }) => theme.borderRadius};
    }

    .sider {
        background: ${(props) => props.theme.baseBgColor};
        box-shadow: ${(props) => props.theme.boxShadow};
        margin: 20px 5px 20px 20px;
        border-radius: ${(props) => props.theme.borderRadius};
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
    }
`;

export default GlobalStyle;
