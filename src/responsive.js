import{ createGlobalStyle } from 'styled-components'

export const breakpoints = {
  mobile: '(min-width: 640px)',
  tablet: '(min-width: 768px)',
  laptop: '(min-width: 1024px)',
  desktop: '(min-width: 1440px)',
}

export const Responsive = createGlobalStyle`
  html {
    --height-viewport: calc(var(--vh) * 100);
    --page-width: 1240px;
    --nav-height-inner: 40px;
    --page-padding: 20px;
    --article-item-padding: 20px;
    --article-width: 100%;
  }

  body {
    font-size: 1.4rem;
  }

  @media ${breakpoints.mobile} {
  }

  @media ${breakpoints.tablet} {
    html {
      --page-padding: 48px;
    }

    body {
      font-size: 1.6rem;
    }
  }

  @media ${breakpoints.laptop} {
    html {
      --article-width: 700px;
    }
  }

  @media ${breakpoints.desktop} {
  }

`
