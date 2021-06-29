import React, { useState, useEffect } from 'react'
import "./ToggleDarkMode.scss"

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
    <button onClick={handleToggle} className="darkmode-button" />
  )
}

export default ToggleDarkMode;
