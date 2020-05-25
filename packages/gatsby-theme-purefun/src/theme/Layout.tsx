import React from 'react'
import 'normalize.css'
import css from 'styled-jsx/css'
import Sidebar from './Sidebar'
import './style.css'

const styles = css`
  .layout {
    display: flex;
    min-height: 100%;
  }
  main {
    flex: 1;
    padding: 5rem;
  }
`

export default function Layout({ children })  {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        {children}
      </main>
      <style jsx>{styles}</style>
    </div>
  )
}
