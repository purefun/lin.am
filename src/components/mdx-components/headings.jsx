import styled, { css } from 'styled-components'

const mixin = css`
  max-width: var(--article-width);
  margin-left: auto;
  margin-right: auto;
  color: var(--color-title);

  a {
    display: none;
    float: left;
    margin-left: -20px;
    padding-right: 4px;

    &:hover {
      border: 0 !important;
    }
  }

  &:hover {
    a {
      display: inline;
    }
  }
`

export const h1 = styled.h1`
  ${mixin}
  border-top: 2px solid var(--color-border);
  padding-top: 40px;
  font-size: 2em;

  &:first-of-type {
    border-top: 0;
    margin-top: 0;
  }
`
export const h2 = styled.h2`
  ${mixin}
  font-size: 1.6em;
`
export const h3 = styled.h3`
  ${mixin}
  font-size: 1.4em;
`
export const h4 = styled.h4`
  ${mixin}
  font-size: 1.2em;
`
export const h5 = styled.h5`
  ${mixin}
  font-size: 1em;
`
export const h6 = styled.h6`
  ${mixin}
  font-size: 0.8em;
`
