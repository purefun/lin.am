const { myCreatePage } = require('../my-create-page')

async function createArticlePages({ articles, createPage }) {
  for (let i = 0; i < articles.length; i++) {
    const { node, next, previous } = articles[i]

    const subfontString = [
      node.frontmatter.title,
      previous ? previous.frontmatter.title : '',
      next ? next.frontmatter.title : '',
    ].join('')

    await myCreatePage({
      createPage,
      path: `/articles/${node.fields.slug}`,
      component: 'src/templates/Article.jsx',
      subfontString,
      context: {
        articleId: node.id,
        previous,
        next,
      },
    })

  }

}

module.exports = {
  createArticlePages,
}
