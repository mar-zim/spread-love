import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

:root {
  --darkblue: #27187E;
  --lightblue: #758bfd;
  --orange: #ff8600;
  --white: #f1f2f6;
  --grey-1: #79797b;
  --grey-2: #3d3d3e;
  --grey-3: #1f1f1f;
  --fontheader: 'Karla';
  --fontbody: 'Lato'
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--white);
  font-family: var(--fontbody), sans-serif;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--grey-2);
}

h1, h2, h3, h4, h5{
  margin: 6px 0;
  font-family: var(--fontheader);
  font-weight: normal;
  color: var(--grey-3);
}

h1 {
  font-size: 48px;
}

h2 {
  font-size: 32px;
}

h3 {
  font-size: 24px;
  color: var(--grey-2);
}

h4 {
  font-size: 20px;
  color: var(--grey-2);
}
`
