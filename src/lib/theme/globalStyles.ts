import { createGlobalStyle } from 'styled-components';
import { fonts, getFont, getFontSizes } from '@lib/theme/fonts';

// TODO: use antd tokens
export const GlobalStyles = createGlobalStyle`
  ${fonts.map((f) => getFont(f, '/fonts/'))}
  
  @font-face {
    font-family: 'Dinpro';
    src: 
      url('/fonts/dinpro.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #fff;
    font-family: "Dinpro", 'Roboto', sans-serif;
    ${getFontSizes('default')}
  }

  h1 {
    ${getFontSizes('header')}
  }

  h2 {
    ${getFontSizes('subheader')}
  }
  
  h3 {
    ${getFontSizes('title')}
    letter-spacing: -0.02em;
  }

  body, p, h1, h2, h3 {
    margin: 0;
  }
`;
