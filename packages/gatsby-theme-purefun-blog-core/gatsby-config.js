module.exports = (pluginOptions) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          gatsbyRemarkPlugins: [
            {
              resolve: 'gatsby-remark-images',
              options: {
                // should this be configurable by the end-user?
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            { resolve: 'gatsby-remark-copy-linked-files' },
            { resolve: 'gatsby-remark-smartypants' },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: pluginOptions.contentPath || `content/posts`,
          name: pluginOptions.contentPath || `content/posts`,
        }
      }
    ]
  }
}
