import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Page from '../components/Page'
import MDXRenderer from '../components/mdx-renderer'
import { clickable } from '../global-style'
import { breakpoints } from '../responsive'

const Article = styled.article`
  padding: 0 20px;

  @media ${breakpoints.laptop} {
    padding: 0;
  }
`

const Header = styled.header`
  text-align: center;
`

const Title = styled.h1`
  font-size: 4rem;
  line-height: 4.9rem;
  font-family: ${({ fontFamily }) => fontFamily};
  color: var(--color-title);
  margin: 0;
`

const Meta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`

const CreatedAt = styled.time``

const CategoryLink = styled(Link)`
  ${clickable};
  font-weight: 500;
  display: inline-block;
  margin-left: 10px;
`

const Body = styled.div`
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 30px;
`

export default function ArticlePage({ data, pageContext }) {
  const { frontmatter, body } = data.mdx
  const { title, createdAt, category } = frontmatter
  const { fontFamily } = pageContext
  return (
    <Page
      context={pageContext}
      title="Article:"
    >
      <Article>
        <Header>
          <Title fontFamily={fontFamily}>{title}</Title>
          <Meta>
            <CreatedAt>{createdAt}</CreatedAt>
            <CategoryLink to={`/articles/category/${category}`}>
              {category}
            </CategoryLink>
          </Meta>
        </Header>
        <Body>
          <MDXRenderer>{body}</MDXRenderer>
        </Body>
      </Article>
    </Page>
  )
}

export const pageQuery = graphql`
  query article($articleId: String!) {
    mdx(id: { eq: $articleId }) {
      ...Article
      body
    }
  }
`
