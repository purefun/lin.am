module.exports = ({ createResolvers, schema }) => {
  const jargonDefinitionResolver = {
    def_cn: {
      resolve(source, args, context, info) {
        console.log(source)
      }
    }
  }
  createResolvers(jargonDefinitionResolver)
}
