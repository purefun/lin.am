// const withDefaults = require('../default-options')
const debug = require('debug')('purefun:blog-core')
debug.log = console.log

const SinglePostTemplate = require.resolve('../../src/theme/SinglePost.tsx')

module.exports = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions
  // const { basePath } = withDefaults(pluginOptions)

  // // /blog/ page
  // createPage({
  //   path: basePath,
  //   component: PostsTemplate,
  //   context: {},
  // })

  const result = await graphql(`
    {
      allBlogPost(filter: { published: { eq: true } }, sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const { allBlogPost } = result.data
  const posts = allBlogPost.edges

  // single post pages
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post
    createPage({
      path: slug,
      component: SinglePostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })
}
