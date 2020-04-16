import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { clickable } from '../global-style'

const HomeLink = styled(Link)`
  font-weight: 500;
  ${clickable};
  color: var(--color-logo);
`

export default function Logo() {
  return <HomeLink to="/">opted.dev</HomeLink>
}
