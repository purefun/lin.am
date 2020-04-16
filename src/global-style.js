import{ css } from 'styled-components'

export const clickable = css`
  border-radius: 4px;
  transition: background 0.2s;
  padding: 5px 8px;

  &:hover {
    background: var(--color-hover);
  }

  &:active {
    background: var(--color-active);
  }
`
