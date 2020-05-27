import React from 'react'
import 'normalize.css'
import css from 'styled-jsx/css'
import Navbar from './Navbar'
import './style.scss'

const styles = css`
  .layout {
    min-height: 100%;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    border-bottom: 1px solid #f1f1f1;
  }
  main {
    padding: 1.5rem;
    padding-top: 5rem;
    box-sizing: border-box;
  }

  @media (min-width: 800px) {
    main {
      padding: 5rem;
    }
  }
`

export default function Layout({ children })  {
  return (
    <div className="layout">
      <nav><Navbar /></nav>
      <main>{children}</main>
      <style jsx>{styles}</style>
    </div>
  )
}
