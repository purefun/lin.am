import React from 'react'
import styled from 'styled-components'
import ArticleItem from './ArticleItem'

const List = styled.div``

export default function ArticleList({ nodes }) {
  return (
    <List>
      {nodes.map(({ node }, idx) => (
        <ArticleItem key={node.id} node={node} idx={idx} />
      ))}
    </List>
  )
}
