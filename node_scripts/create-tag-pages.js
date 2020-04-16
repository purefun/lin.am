const { myCreatePage } = require('./my-create-page')

async function createTagPages({ posts, createPage }) {
  const nestedTags = posts.map(({ node }) => node.frontmatter.tags || [])
  const allTags = [].concat(...nestedTags)
    .filter((tag, i, tags) => tags.indexOf(tag) === i)

  for (let i = 0; i < allTags.length; i += 1) {
    const tag = allTags[i]
    const postsByTag = posts.filter(({ node }) => {
      return (node.frontmatter.tags || []).includes(tag)
    })
    const titleString = postsByTag
      .map(({ node }) => node.frontmatter.title).join('')

    await myCreatePage({
      createPage,
      path: `/blog/tags/${tag}`,
      component: 'src/templates/tag.jsx',
      context: { tag },
      subfontString: titleString,
    })
  }
}

module.exports = {
  createTagPages,
}
