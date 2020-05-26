import React from 'react'
import css from 'styled-jsx/css'
import {Link} from 'gatsby'

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
        <Link to="/" className={linkCSS.className}>lin.am</Link>
      </aside>
      {linkCSS.styles}
    </>
  )
}
