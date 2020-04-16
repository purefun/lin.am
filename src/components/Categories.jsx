import React from 'react'
import{ useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { clickable } from '../global-style'
import { breakpoints } from '../responsive'

const query = graphql`
  query categories {
    allMdx(
      filter: { fields: { module: { eq: "articles" } } }
    ) {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
    }
  }
`

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
  overflow: auto hidden;
  -webkit-overflow-scrolling: touch;
  padding: 20px var(--page-padding);
  position: absolute;
  top: calc(var(--page-padding) + var(--nav-height-inner));
  left: calc(-1 * var(--page-padding));
  right: calc(-1 * var(--page-padding));


  @media ${breakpoints.laptop} {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    // background: rgba(255, 255, 0, 0.2);
    justify-content: center;
    border: 0;
    padding: 0;
  }
`

const CategoryList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  // background: red;
`

const CategoryItem = styled.li`
  list-style-type: none;
`

const CategoryLink = styled(Link)`
  ${clickable};
  font-weight: 500;
  color: var(--color-category);
  display: block;

  &[aria-current=page] {
    span {
      border-bottom: 2px solid var(--color-category);
    }
  }

`

const link = category => {
  if (category === 'All') {
    return '/'
  }
  return `/articles/category/${category}/`
}


export default function Categories() {
  const data = useStaticQuery(query)
  const categories = data.allMdx.edges
    .map(({ node }) => node.frontmatter.category)
    .filter((category, idx, allCategories) => allCategories.indexOf(category) === idx)

  categories.unshift('All')
  const othersIdx = categories.indexOf('Others');
  if (othersIdx > -1) {
    categories.splice(othersIdx, 1)
    categories.push('Others')
  }

  return (
    <CategoryWrapper>
      <CategoryList>
        {categories.map(category => (
          <CategoryItem key={category}>
            <CategoryLink
              to={link(category)}
            >
              <span>{category}</span>
            </CategoryLink>
          </CategoryItem>
        ))}
      </CategoryList>
    </CategoryWrapper>
  )
}
