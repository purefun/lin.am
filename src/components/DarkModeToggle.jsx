import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const MoonOrSun = styled.div`
  border: ${p => (p.isDark ? '2px' : '4px')} solid transparent;
  background: ${p => p.isDark ? 'var(--color-moon)' : 'var(--color-sun)'};
  border-radius: 50%;
  height: 24px;
  overflow: ${p => (p.isDark ? 'hidden' : 'visible')};
  position: relative;
  transform: scale(${p => (p.isDark ? 1 : 0.55)});
  transition: transform 0.45s ease;
  width: 24px;

  &::before {
    border-radius: 50%;
    border: 2px solid ${p => p.isDark ? 'var(--color-moon)' : 'var(--color-sun)'};
    content: "";
    height: 24px;
    opacity: ${p => (p.isDark ? 1 : 0)};
    position: absolute;
    right: -9px;
    top: -9px;
    transform: translate(${p => (p.isDark ? '0, 0' : '14px, -14px')});
    transition: transform 0.45s ease;
    width: 24px;
  }

  &::after {
    border-radius: 50%;
    box-shadow: 0 -23px 0 var(--color-sun),
      0 23px 0 var(--color-sun),
      23px 0 0 var(--color-sun),
      -23px 0 0 var(--color-sun),
      15px 15px 0 var(--color-sun),
      -15px 15px 0 var(--color-sun),
      15px -15px 0 var(--color-sun),
      -15px -15px 0 var(--color-sun);
    content: "";
    height: 8px;
    left: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    width: 8px;
    transform: rotate(${p => (p.isDark ? '90deg' : '0')}) scale(${p => (p.isDark ? 0 : 1)});
    transition: all 0.35s ease;
  }
`

const MoonMask = styled.div`
  background: var(--color-bg);
  border-radius: 50%;
  border: 0;
  height: 24px;
  opacity: ${p => (p.isDark ? 1 : 0)};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(${p => (p.isDark ? '0, 0' : '14px, -14px')});
  transition: background 0.3s ease, transform 0.45s ease;
  width: 24px;
`

const IconWrapper = styled.button`
  padding: 0;
  appearance: none;
  align-items: center;
  background: var(--color-bg);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  width: 40px;
  justify-content: center;
  outline: none;
  margin-right: -11px;
  opacity: 0.75;
  overflow: hidden;
  position: relative;
  transform: scale(0.75);
  transition: background 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  vertical-align: middle;

  &:hover {
    opacity: 1;
    background-color: var(--color-hover);
    transform: scale(0.75);

    ${MoonMask} {
      background-color: var(--color-hover);
    }
  }
`

const getColorScheme = () => {
  if (typeof window === 'undefined') {
    return null
  }
  return document.documentElement.getAttribute('color-scheme')
}

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(getColorScheme())

  const handleChangeTheme = (nextTheme) => {
    localStorage.setItem('theme', nextTheme)
    document.documentElement.setAttribute('color-scheme', nextTheme)
    setTheme(nextTheme)
  }

  useEffect(() => {
    if (theme) {
      const handler = (event) => {
        const nextTheme = event.matches ? 'dark' : 'light'
        handleChangeTheme(nextTheme)
      }
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
      darkQuery.addListener(handler)

      return () => {
        darkQuery.removeListener(handler)
      }

    }
  }, [theme])

  useEffect(() => {
    setTheme(getColorScheme())
  }, [])

  const handleToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    handleChangeTheme(nextTheme)
  }

  const isDark = theme === 'dark'

  return (
    <IconWrapper onClick={handleToggle}>
      {theme !== null && (
        <>
          <MoonOrSun isDark={isDark} />
          <MoonMask isDark={isDark} />
        </>
      )}
    </IconWrapper>
  )

}
