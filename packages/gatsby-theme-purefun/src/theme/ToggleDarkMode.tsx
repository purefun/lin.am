import React, { useState, useEffect } from 'react'

const getColorScheme = () => {
  if (typeof window === 'undefined') {
    return null
  }
  return document.documentElement.getAttribute('color-scheme')
}

const ToggleDarkMode: React.FC<{}> = () => {
  const [theme, setTheme] = useState(getColorScheme())

  const changeTheme = (nextTheme) => {
    localStorage.setItem('theme', nextTheme)
    document.documentElement.setAttribute('color-scheme', nextTheme)
    setTheme(nextTheme)
  }


  const handleToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    changeTheme(nextTheme)
  }

  useEffect(() => {
    if (theme) {
      const handler = (event) => {
        const nextTheme = event.matches ? 'dark' : 'light'
        changeTheme(nextTheme)
      }
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
      darkQuery.addListener(handler)

      return () => {
        darkQuery.removeListener(handler)
      }

    }
  }, [theme])

  return (
    <button onClick={handleToggle}>
      <style jsx>{`
        button {
          display: block;
          margin: 0;
          background: linear-gradient(
            -45deg,
            var(--color-bg),
            var(--color-bg) 50%,
            var(--color-primary) 50%
          );
          border: 1px solid var(--color-primary);
          cursor: pointer;
          outline: 0;
          border-radius: 100px;
          width: 16px;
          height: 16px;
        }
      `}</style>
    </button>
  )
}

export default ToggleDarkMode;