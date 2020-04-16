const { myCreatePage } = require('../my-create-page')

const pageSize = 10

const createPaginationPage = async ({ createPage, pagePath, context, subfontString }) => {
  await myCreatePage({
    createPage,
    path: pagePath,
    component: 'src/templates/Articles.jsx',
    context,
    subfontString,
  })
}

async function createPaginationPages({ articles, createPage }) {
  const total = articles.length
  const pageTotal = Math.ceil(total / pageSize)
  for (let page = 0; page < pageTotal; page += 1) {
    const articlesInPage = articles.slice(page * pageSize, page * pageSize + pageSize)
    const titleString = articlesInPage.map(({ node }) => node.frontmatter.title).join('')
    const context = {
      page,
      pageSize,
      skip: page * pageSize,
      limit: pageSize,
    }

    await createPaginationPage({
      createPage,
      pagePath: `/articles/page/${page + 1}`,
      context,
      subfontString: titleString,
    })

    if (page === 0) {
      // home page
      await createPaginationPage({
        createPage,
        pagePath: '/',
        context,
        subfontString: titleString,
      })
      await createPaginationPage({
        createPage,
        pagePath: '/articles/',
        context,
        subfontString: titleString,
      })
    }
  }
}

module.exports = {
  createPaginationPages,
}
