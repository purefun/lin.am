const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

module.exports = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(`interface BlogPost implements Node {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      modified: Date @dateformat
      published: Boolean!
      topic: String!
  }`)

  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        modified: { type: `Date`, extensions: { dateformat: {} } },
        topic: { type: 'String!' },
        published: { type: "Boolean!" },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`, `BlogPost`],
      extensions: {
        infer: false,
      }
    })
  )
}
