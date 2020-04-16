const { myCreatePage } = require('./my-create-page')

async function createAllTagsPage({ posts, createPage }) {

  await myCreatePage({
    createPage,
    path: `/blog/tags/`,
    component: 'src/templates/Tags.jsx',
    context: {},
  })
}

module.exports = {
  createAllTagsPage,
}
