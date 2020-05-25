import React from 'react'
import css from 'styled-jsx/css'
import {Link} from 'gatsby'

const styles = css`
  aside {
    width: 280px;
    background: #F6F6F6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const linkCSS = css.resolve`
  a {
    text-decoration: none;
    color: black;
    font-weight: 500;
  }
  a:hover {
    border-bottom: 1px solid black;
  }
`

export default function Sidebar() {
  return (
    <>
      <aside>
        <Link to="/" className={linkCSS.className}>purefun.io</Link>
      </aside>
      <style jsx>{styles}</style>
      {linkCSS.styles}
    </>
  )
}
