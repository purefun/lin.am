import styled, { css } from 'styled-components'

const style = css`
  max-width: var(--article-width);
  margin-left: auto;
  margin-right: auto;
  line-height: 2.8rem;

  p {
    margin: 0;
  }
`

export const ul = styled.ul(style)
export const ol = styled.ol(style)
export const li = styled.li``
