import styled from 'styled-components'


export const table = styled.table`
  width: var(--article-width);
  margin: 24px auto 0;
  border: 2px solid var(--color-border);
  border-radius: 5px;
  border-spacing: 0;
`

export const tr = styled.tr`
  &:last-child {
    td {
      // border-top: 1px solid var(--primary-color);
    }

  }
`

export const td = styled.td`
  padding: 10px;
  text-align: ${props => props.align};

`



export const th = styled.th`
  padding: 10px;
  border-bottom: 2px solid var(--color-border);
  text-align: ${props => props.align};
  background: var(--color-border);
  color: var(--bg);
`
