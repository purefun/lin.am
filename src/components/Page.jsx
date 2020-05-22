import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import Categories from './Categories'
import { Responsive, breakpoints } from '../responsive'
import '../theme.scss'
import '../icons.scss'

const LayoutWrapper = styled.div`
  min-height: var(--height-viewport);
  display: flex;
  flex-direction: column;
`

const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: var(--page-padding);

  @media ${breakpoints.laptop} {
    margin-bottom: 30px;
  }
`

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--height-nav-inner);
  position: relative;
`

const Main = styled.main`
  // max-width: var(--page-width);
  flex: 1;
  // min-height: var(--height-viewport);
  margin: 0 auto;
  // margin-top: calc(-1 * var(--nav-height));
  // padding-top: var(--nav-height);
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  // background: rgba(0, 255,0, 0.3);
  width: 100%;

  // @media ${breakpoints.laptop} {
  //   width: var(--article-width);
  // }
`

const PageFontFace = createGlobalStyle`
  @font-face {
    font-family: "${props => props.fontFamily}";
    src: url(${props => props.base64}) format('woff2');
    font-style: normal;
  }
`

const Footer = styled.div`
  text-align: center;
  color: var(--color-footnote);
  margin-top: auto;
  padding-top: 80px;
  font-size: 1.2rem;
`

const Context = React.createContext({})

function Page({ children, context, title }) {
  const { fontFamily } = context
  return (
    <LayoutWrapper>
      <Helmet>
        <title>{title} - Lin</title>
      </Helmet>
      <Responsive />
      <PageFontFace
        fontFamily={context.fontFamily}
        base64={context.fontBase64}
      />

      <Context.Provider value={{ fontFamily }}>
        <Nav>
          <NavInner>
            <Logo />
            <Categories />
            <DarkModeToggle />
          </NavInner>
        </Nav>


        <Main>
          {children}
          <Footer>四方上下，古往今来。</Footer>
        </Main>
      </Context.Provider>

  </LayoutWrapper>
  )
}

Page.Context = Context

const { node, shape, string } = PropTypes

Page.propTypes = {
  children: node.isRequired,
  context: shape().isRequired,
  title: string.isRequired,
}

export default Page
