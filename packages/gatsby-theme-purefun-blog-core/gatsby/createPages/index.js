const debug = require('debug')('purefun:blog-core')
debug.log = console.log

module.exports = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
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

  debug('allPost.length', result.length)
}
