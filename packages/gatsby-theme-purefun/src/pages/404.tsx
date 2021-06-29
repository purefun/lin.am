import React from 'react'


const htmlOpen = '<html>'
const htmlClose = '</html>'

const NotFoundContainer = () => (
  <pre>
    <div className="notfound">
      {htmlOpen}<span>404</span>{htmlClose}
    </div>
  </pre>
)

export default NotFoundContainer
