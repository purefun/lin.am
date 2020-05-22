module.exports = pluginOptions => {
  const basePath = pluginOptions.basePath || `/blog`
  const contentPath = pluginOptions.contentPath || `content/posts`

  return {
    basePath,
    contentPath,
  }
}
