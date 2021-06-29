import React from 'react'
import ToggleDarkMode from './ToggleDarkMode'
import "./Footer.scss"

const Footer: React.FC<{}> = () => (
  <div className="footer-inner">
    <ul>
      <li><a href="https://github.com/purefun">Github</a></li>
      <li><a href="https://twitter.com/purefun2333">Twitter</a></li>
      <li><ToggleDarkMode /></li>
    </ul>
  </div>
)

export default Footer;
