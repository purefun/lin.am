const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { urlResolve, createContentDigest } = require(`gatsby-core-utils`)
const withDefaults = require('../default-options')

module.exports = async (
  { node, actions, getNode, createNodeId },
  pluginOptions
) => {
  const { createNode, createParentChildLink } = actions
  const { contentPath, basePath } = withDefaults(pluginOptions)

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (source !== contentPath) {
    return
  }

  let slug
  if (node.frontmatter.slug) {
    if (path.isAbsolute(node.frontmatter.slug)) {
      // absolute paths take precedence
      slug = node.frontmatter.slug
    } else {
      // otherwise a relative slug gets turned into a sub path
      slug = urlResolve(basePath, node.frontmatter.slug)
    }
  } else {
    // otherwise use the filepath function from gatsby-source-filesystem
    const filePath = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath,
    })

    slug = urlResolve(basePath, filePath)
  }
  // normalize use of trailing slash
  slug = slug.replace(/\/*$/, `/`) /**/

    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
      image: node.frontmatter.image,
      socialImage: node.frontmatter.socialImage
    }

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`)
    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxPostId) })
  }
