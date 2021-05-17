module.exports = (pluginOptions) => {
  return {
    plugins: [
      {
        resolve: "gatsby-plugin-manifest",
        options: {
          name: "lin.am",
          short_name: "lin.am",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#257F6B",
          display: "standalone",
          icon: `${__dirname}/src/static/images/favicon.png`,
          crossOrigin: `use-credentials`,
        },
      },
      {
        resolve: "gatsby-plugin-react-helmet",
      },
      {
        resolve: "gatsby-plugin-sharp",
      },
      {
        resolve: "gatsby-transformer-sharp",
      },
      {
        resolve: "gatsby-plugin-sass",
      },
      {
        resolve: "gatsby-plugin-page-creator",
        options: {
          path: `${__dirname}/src/pages`,
        },
      },
      {
        resolve: "gatsby-plugin-typescript",
      },
      {
        resolve: "gatsby-plugin-styled-jsx",
      },
      {
        resolve: "gatsby-plugin-mdx",
        options: {
          extensions: [".mdx", ".md"],
          gatsbyRemarkPlugins: [
            {
              resolve: "gatsby-remark-images",
              options: {
                // should this be configurable by the end-user?
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            { resolve: "gatsby-remark-copy-linked-files" },
            { resolve: "gatsby-remark-smartypants" },
          ],
          remarkPlugins: [
            require("remark-slug"),
            require("remark-join-cjk-lines"),
          ],
        },
      },
      {
        resolve: "gatsby-transformer-yaml",
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "content/topics",
          name: "content/topics",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: pluginOptions.contentPath || `content/posts`,
          name: pluginOptions.contentPath || `content/posts`,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "content/jargons",
          name: "content/jargons",
        },
      },
      {
        resolve: "gatsby-plugin-webfonts",
        options: {
          formats: ["woff2"],
          fonts: {
            google: [
              {
                family: "Roboto Mono",
                variants: ["400", "500"],
                strategy: "base64",
              },
            ],
          },
        },
      },
      {
        resolve: "gatsby-plugin-nprogress",
        options: {
          color: "var(--color-primary)",
          showSpinner: false,
        },
      },
    ],
  };
};
