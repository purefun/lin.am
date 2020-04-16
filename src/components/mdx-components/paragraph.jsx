import React from 'react'
import styled from 'styled-components'

const TextParagraph = styled.p`
  max-width: var(--article-width);
  line-height: 3.2rem;
  margin: 20px auto 0;

  // gif
  > img {
    max-width: 100%;
    margin: 0 auto;
  }
`

const isImageNode = node => {
  return node.props && node.props.mdxType === 'figure'
}

const containsImageNode = nodes => {
  return nodes.some(isImageNode)
}

const ImagesBlock = styled.div`
  // display: flex;
  // justify-content: center;
  // flex-wrap: wrap;
`

const sizes = {
  small: '700px',
  medium: '1200px',
  large: '1600px',
}

export const p = ({ children, ...props }) => {
  let nodes = Array.isArray(children) ? children : [children]
  nodes = nodes.filter(node => node !== '\n')
  if (containsImageNode(nodes)) {
    const images = nodes.map(node => {
      const wrapper = node.props
        && node.props.children.find
        && node.props.children.find(child => child.props && child.props.className === 'gatsby-resp-image-wrapper')
      if (wrapper) {
        const img = wrapper.props.children.find(child => child.props && child.props.className === 'gatsby-resp-image-image')
        const matches = img.props.src.match(/___(.+)\.(jpg|png)$/) || []
        const basis = sizes[matches[1]] ? sizes[matches[1]] : wrapper.props.style.maxWidth
        node.props.style.maxWidth = basis
        wrapper.props.style.maxWidth = basis
      }
      return node
    })
    return <ImagesBlock>{images}</ImagesBlock>
  }

  return <TextParagraph {...props}>{children}</TextParagraph>
}
