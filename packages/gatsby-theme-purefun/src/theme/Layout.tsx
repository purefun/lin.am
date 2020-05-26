import React from 'react'
import 'normalize.css'
import css from 'styled-jsx/css'
import Sidebar from './Sidebar'
import './style.scss'

const styles = css`
  .layout {
    min-height: 100%;
  }
  aside {
    background: #F6F6F6;
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
    aside {
      position: fixed;
      width: 280px;
      top: 0;
      left: 0;
      bottom: 0;
    }
    main {
      padding: 5rem;
      padding-left: calc(280px + 5rem);
    }
  }
`

export default function Layout({ children })  {
  return (
    <div className="layout">
      <aside>
        <Sidebar />
      </aside>
      <main>
        {children}
      </main>
      <style jsx>{styles}</style>
    </div>
  )
}
