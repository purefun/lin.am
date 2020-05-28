const React = require('react')

const script = `
  (function() {
    function initTheme(theme) {
      document.documentElement.setAttribute('color-scheme', theme)
    }
    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var preferredTheme;
    try {
      preferredTheme = localStorage.getItem('theme');
    } catch (err) { }

    var theme = preferredTheme ? preferredTheme : (isDark ? 'dark' : 'light')
    initTheme(theme)
  })();
`

exports.onPreRenderHTML = ({ getHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.push(
    <script key="dark-mode" dangerouslySetInnerHTML={{ __html: script }} />
  )
}
