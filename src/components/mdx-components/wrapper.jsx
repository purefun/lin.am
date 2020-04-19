import styled from 'styled-components'
import { breakpoints } from '../../responsive'


export const wrapper = styled.div`

  * {
    // transition: all 0.3s;
  }

  @media ${breakpoints.tablet} {
    // font-size: 12px;
  }

  @media ${breakpoints.laptop} {
    // font-size: 14px;
  }

  .gatsby-resp-image-figure {
    margin: 20px 0;
  }

  .gatsby-resp-image-wrapper {
    overflow: hidden;
  }
  .gatsby-resp-image-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .gatsby-resp-image-figcaption {
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
  }

  .gatsby-resp-image-background-image {
    // filter: blur(10px);
    border-radius: 5px;
    display: none;
  }

  .footnotes {
    font-size: 0.9em;

    ol {
      border-top: 2px solid var(--secondary-color);
      padding: 10px 0 0 15px;

      li {
        margin-bottom: 10px;
      }
    }

    hr {
      display: none;
    }

    p {
      margin: 0;
      line-height: 2rem;
    }

    code {
      padding: 1px 3px;
    }
  }
`
