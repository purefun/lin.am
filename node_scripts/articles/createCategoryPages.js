const { myCreatePage } = require('../my-create-page')

async function createCategoryPages({ articles, createPage }) {
  const categories = articles
    .map(({ node }) => node.frontmatter.category || [])
    .filter((category, idx, all) => all.indexOf(category) === idx)

  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i]
    const articlesByCategory = articles.filter(({ node }) => {
      return node.frontmatter.category === category
    })
    const titleString = articlesByCategory
      .map(({ node }) => node.frontmatter.title).join('')

    await myCreatePage({
      createPage,
      path: `/articles/category/${category}`,
      component: 'src/templates/Category.jsx',
      context: { category },
      subfontString: titleString,
    })
  }
}
module.exports = {
  createCategoryPages,
}
