import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const isClient = typeof window !== 'undefined'
const getPropertyValue = property => parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(property)
)

const Figure = styled.figure`
  img {
    cursor: ${({ cursor }) => cursor};
  }
`


function ZoomableFigure({ style, ...otherProps }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const ref = useRef()

  useEffect(() => {
    setContainerWidth(ref.current.parentElement.getBoundingClientRect().width)
  }, [])

  if (!isClient) {
    return <figure style={style} {...otherProps} />
  }

  const imageWidth = parseInt(style.maxWidth)
  const articleWidth = getPropertyValue('--article-width') || 700
  const zoomedWidth = Math.min(imageWidth, containerWidth)

  const zoomable = imageWidth > articleWidth

  const maxWidth = isZoomed ? `${zoomedWidth}px` : 'var(--article-width)';
  const cursor = zoomable ? (isZoomed ? 'zoom-out' : 'zoom-in') : 'default'

  const newStyle = {
    ...style,
    maxWidth,
    transition: 'all 0.3s',
    margin: '2.4rem auto 0',
  }

  const handleClick = (e) => {
    e.target.tagName === 'IMG' && zoomable && setIsZoomed(!isZoomed)
  }

  return (
    <Figure
      ref={ref}
      style={newStyle}
      cursor={cursor}
      onClick={handleClick}
      {...otherProps}
    />
  )
}

export const figure = ZoomableFigure
