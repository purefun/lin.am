import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Page from '../components/Page'
import { clickable } from '../global-style'
import { breakpoints } from '../responsive'

const Item = styled.article`
  ${clickable};
  position: relative;
  border-radius: 0;
  padding: 40px var(--page-padding);
  border-bottom: 1px solid var(--color-border);

  &:last-of-type {
    border: 0;
  }

  &:hover {
    border-color: var(--color-border-hover) !important;
  }

  @media ${breakpoints.laptop} {
    border-radius: 12px;
    border: 2px solid var(--color-border);
    margin: 50px -72px;

    &:last-of-type {
      border: 2px solid var(--color-border);
    }
  }
`

const ItemLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-indent: -9999px;
`

const Title = styled.h2`
  font-family: ${props => props.fontFamily};
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin: 0;

  a {
    color: var(--color-title);
  }

  @media ${breakpoints.laptop} {
    font-size: 3.2rem;
    line-height: 4.4rem;
  }
`

const Excerpt = styled.p`
  margin: 10px 0 0;
`

const Meta = styled.div`
  display: flex;
  margin-top:10px;
`

const CreatedAt = styled.time`
  margin-right: 20px;
`

const Category = styled.div`
  font-weight: 500;
`

export default function ArticleItem({ node }) {
  const { fontFamily } = useContext(Page.Context)
  const { frontmatter, fields } = node
  const { title, createdAt, excerpt, category } = frontmatter
  return (
    <Item>
      <Title fontFamily={fontFamily}>
        <Link to={`/articles/${fields.slug}`}>{title}</Link>
      </Title>
      <Meta>
        <CreatedAt datetime={createdAt}>{createdAt}</CreatedAt>
        <Category>{category}</Category>
      </Meta>
      <Excerpt>{excerpt}</Excerpt>
      <ItemLink to={`/articles/${fields.slug}`}>{title}</ItemLink>
    </Item>
  )
}
