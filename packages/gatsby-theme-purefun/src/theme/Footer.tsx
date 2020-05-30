import React from 'react'
import ToggleDarkMode from './ToggleDarkMode'

const Footer: React.FC<{}> = () => (
  <div className="footer-inner">
    <ul>
      <li><a href="https://github.com/purefun">Github</a></li>
      <li><a href="https://twitter.com/purefun2333">Twitter</a></li>
      <li><ToggleDarkMode /></li>
    </ul>
    <style jsx>{`
      ul {
        display: flex;
        font-size: 1.2rem;
      }
      li {
        list-style-type: none;
        margin: 0 1.8rem;
      }

      a {
        text-decoration: none;
        color: var(--color-gray-500);
      }

      a:hover {
        border-bottom: 1px solid var(--color-gray-500);
      }
    `}</style>
  </div>
)

export default Footer;
