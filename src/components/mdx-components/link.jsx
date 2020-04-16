import styled from 'styled-components'

export const a = styled.a`
  color: var(--color-text);
  padding: 2px;
  border-bottom: 1px solid var(--color-md-link-border);


  &:hover {
    color: var(--color-title);
    border-color: var(--color-title);
    transition: all 0.2s ease;
  }
`
