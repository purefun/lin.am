import React, { useState } from 'react'

function Image({ style, ...otherProps }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const newStyle = {
    ...style,
    backgroundColor: isLoaded ? 'white' : 'transparent',
    opacity: isLoaded ? '1' : '0',
    transition: 'opacity 0.3s',
  }
  return (
    <img
      style={newStyle}
      {...otherProps}
      onLoad={() => setIsLoaded(true)}
    />
  )
}

export const img = Image

