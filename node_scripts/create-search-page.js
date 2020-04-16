const { myCreatePage } = require('./my-create-page')

async function createSearchPage({ posts, createPage }) {

  await myCreatePage({
    createPage,
    path: `/blog/search/`,
    component: 'src/templates/Search.jsx',
    context: {},
  })
}

module.exports = {
  createSearchPage,
}
