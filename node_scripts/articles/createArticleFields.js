const { createFilePath } = require('gatsby-source-filesystem')
const trimSlash = str => str.replace(/^\/|\/$/g, '')

const createArticleFields = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx' && /content\/articles/.test(node.fileAbsolutePath))  {
    const path = createFilePath({ node, getNode })
    const slug = trimSlash(path)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
    createNodeField({
      node,
      name: 'module',
      value: 'articles',
    })
  }
}

module.exports = {
  createArticleFields,
}
