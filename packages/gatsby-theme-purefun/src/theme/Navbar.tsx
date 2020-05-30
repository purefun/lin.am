import React from 'react'
import css from 'styled-jsx/css'
import {Link} from 'gatsby'

const linkCSS = css.resolve`
  a {
    text-decoration: none;
    display: inline-block;
    padding: 0.3rem 0.6rem;
    color: var(--color-logo-text);
    font-weight: 500;
    font-size: 1.8rem;
    background: var(--color-primary);
  }
  a:hover {
  }
  p {

  }
`

export default function Navbar() {
  return (
    <div className="nav">
      <Link to="/" className={linkCSS.className}>purefun.io</Link>
      <div className="desc">Another developer's blog</div>
      {linkCSS.styles}
      <style jsx>{`
        .nav {
          text-align: center;
          padding: 3rem 0;
        }
        .desc {
          color: var(--color-gray-500);
          font-size: 1.4rem;
          margin-top: 0.4rem;
        }
      `}</style>
    </div>
  )
}
