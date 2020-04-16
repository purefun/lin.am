const { createArticles, createArticleFields } = require('./node_scripts/articles')

exports.onCreateNode = (options) => {
  createArticleFields(options)
}

exports.createPages = async options => {
  await createArticles(options)
}

