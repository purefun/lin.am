import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'


const NotFound = styled.pre`
  font-family: Operator, Menlo, Consolas, 'New Courier';
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-align: center;
  margin: 0;

  span {
    display: block;
    font-size: 10rem;
  }
`

const htmlOpen = `<html>`
const htmlClose = '</html>'

const NotFoundContainer = () => (
  <Page context={{}}>
    <NotFound>
      <div>
        {htmlOpen}<span>404</span>{htmlClose}
      </div>
    </NotFound>
  </Page>
)

export default NotFoundContainer
