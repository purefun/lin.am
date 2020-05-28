import React from 'react'
import 'normalize.css'
import css from 'styled-jsx/css'
import { Helmet } from 'react-helmet'
import Navbar from './Navbar'
import Footer from './Footer'
import './style.scss'

const styles = css`
  .layout {
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-gray-200);
  }
  main {
    padding: 1.5rem;
    padding-top: 5rem;
    box-sizing: border-box;
  }
  footer {
    margin-top: auto;
    border-top: 1px solid var(--color-gray-200);
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    color: var(--color-gray-300);
  }

  @media (min-width: 800px) {
    main {
      padding: 5rem;
    }
  }
`
interface LayoutProps {
  title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title = '' }) => {
  return (
    <div className="layout">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <nav><Navbar /></nav>
      <main>{children}</main>
      <footer><Footer /></footer>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Layout
