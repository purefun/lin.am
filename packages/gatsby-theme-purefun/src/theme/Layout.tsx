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
    width: 280px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #F6F6F6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  main {
    padding: 5rem;
    padding-left: calc(280px + 5rem);
    box-sizing: border-box;
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
