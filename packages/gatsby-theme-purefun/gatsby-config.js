module.exports = (pluginOptions) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: "purefun.io",
          short_name: "purefun",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#257F6B",
          // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
          // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
          display: "standalone",
          icon: "src/images/favicon.png", // This path is relative to the root of the site.
          // An optional attribute which provides support for CORS check.
          // If you do not provide a crossOrigin option, it will skip CORS for manifest.
          // Any invalid keyword or empty string defaults to `anonymous`
          crossOrigin: `use-credentials`,
        },
      },
      {
        resolve: 'gatsby-plugin-react-helmet',
      },
      {
        resolve: 'gatsby-plugin-sharp',
      },
      {
        resolve: 'gatsby-transformer-sharp',
      },
      {
        resolve: 'gatsby-plugin-page-creator',
        options: {
          path: `${__dirname}/src/pages`,
        },
      },
      {
        resolve: 'gatsby-plugin-typescript',
      },
      {
        resolve: 'gatsby-plugin-styled-jsx',
      },
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
          remarkPlugins: [
            require('remark-slug'),
            require('remark-join-cjk-lines'),
          ],
        },
      },
      {
        resolve: 'gatsby-transformer-yaml',
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: 'content/topics',
          name: 'content/topics',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: pluginOptions.contentPath || `content/posts`,
          name: pluginOptions.contentPath || `content/posts`,
        }
      },
      {
        resolve: 'gatsby-plugin-webfonts',
        options: {
          formats: ['woff2'],
          fonts: {
            google: [
              {
                family: 'Roboto Mono',
                variants: ['400', '500'],
                strategy: 'base64',
              },
            ]
          }
        }
      },
      {
        resolve: 'gatsby-plugin-nprogress',
        options: {
          color: 'var(--color-primary)',
          showSpinner: false,
        }
      },
    ]
  }
}
