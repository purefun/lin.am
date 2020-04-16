const { createArticlePages } = require('./createArticlePages')
const { createCategoryPages } = require('./createCategoryPages')
const { createPaginationPages } = require('./createPaginationPages')
const { createArticleFields } = require('./createArticleFields')

const createArticles = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    fragment Article on Mdx {
      id
      body
      fields {
        slug
      }
      tableOfContents
      frontmatter {
        title
        createdAt(formatString: "YYYY-MM-DD")
        excerpt
        category
      }
    }
    query {
      allMdx(
        sort: { fields: [frontmatter___createdAt], order: DESC }
      ) {
        edges {
          node {
            ...Article
            parent {
              ... on File {
                sourceInstanceName
              }
            }
          }
          previous {
            ...Article
          }
          next {
            ...Article
          }
        }
      }
    }
  `)

  const articles = data.allMdx.edges
    .filter(({ node }) => node.parent.sourceInstanceName === 'articles')

  await createArticlePages({ articles, createPage });
  await createCategoryPages({ articles, createPage })
  await createPaginationPages({ articles, createPage })

}

module.exports = {
  createArticles,
  createArticleFields,
}
