const { createPostPages } = require('./create-post-pages')
const { createCategoryPages } = require('./create-category-pages')
const { createPaginationPages } = require('./create-pagination-pages')

const createArticlePages = async ({ graphql, actions }) => {
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

  const posts = data.allMdx.edges
    .filter(({ node }) => node.parent.sourceInstanceName === 'blog')

  await createPostPages({ posts, createPage })
  await createPaginationPages({ posts, createPage })
  await createCategoryPages({ posts, createPage })
  // await createTagPages({ posts, createPage })
  // await createAllTagsPage({ posts, createPage })
  // await createSearchPage({ posts, createPage })

}

module.exports = {
  createArticlePages,
}
