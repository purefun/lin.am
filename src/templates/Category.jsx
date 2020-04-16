import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Page from '../components/Page'
import ArticleList from '../components/ArticleList'

const ListWrapper = styled.div`
  margin: 0 auto;
  width: var(--article-width);
`

export default function Category({ data, pageContext }) {
  const { allMdx } = data
  return (
    <Page context={pageContext} title="Category: ">
      <ListWrapper>
        <ArticleList nodes={allMdx.edges} />
      </ListWrapper>
    </Page>
  )
}

export const query = graphql`
  query carticlesByCategory($category: String!) {
    allMdx(
      sort: { fields: [frontmatter___createdAt], order: DESC },
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
`

