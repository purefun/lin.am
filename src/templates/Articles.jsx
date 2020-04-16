import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Page from '../components/Page'
import ArticleList from '../components/ArticleList'
import { clickable } from '../global-style'
import { breakpoints } from '../responsive'

const ListWrapper = styled.div`
  margin: 0 auto;
  width: var(--article-width);
`

const Pagination = styled.div`
  border-top: 2px solid var(--color-border);
  padding: 10px var(--page-padding);
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  @media ${breakpoints.laptop} {
    margin: 50px -72px;
    padding: 10px 0;
  }
`

const PageCount = styled.div``

const PageLink = styled(Link)`
  ${({ disabled }) => disabled ? '' : clickable};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  color: ${({ disabled }) => disabled ? 'var(--color-pagination-disabled)' : 'var(--color-pagination-enabled)'};
  padding: 10px 15px;
  width: 85px;
  text-align: center;
`

export default function Articles({ data, pageContext }) {
  const { allMdx } = data
  const { currentPage, hasPreviousPage, hasNextPage, pageCount } = allMdx.pageInfo
  return (
    <Page context={pageContext} title="Home">
      <ListWrapper>
        <ArticleList nodes={allMdx.edges} />

        <Pagination>
          <PageLink
            to={`/articles/page/${currentPage - 1}`}
            disabled={!hasPreviousPage}
          >
            Previous
          </PageLink>
          <PageCount>{currentPage}/{pageCount}</PageCount>
          <PageLink
            to={`/articles/page/${currentPage + 1}`}
            disabled={!hasNextPage}
          >
            Next
          </PageLink>
        </Pagination>

      </ListWrapper>
    </Page>
  )
}

export const query = graphql`
  query articles($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___createdAt], order: DESC }
      skip: $skip
      limit: $limit
      filter: { fields: { module: { eq: "articles" } } }
    ) {
      edges {
        node {
          ...Article
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        currentPage
        pageCount
      }
    }
  }
`

