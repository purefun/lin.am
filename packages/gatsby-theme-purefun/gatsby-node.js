module.exports = {
  onPreBootstrap: require('./gatsby/onPreBootstrap'),
  createSchemaCustomization: require('./gatsby/createSchemaCustomization'),
  onCreateNode: require('./gatsby/onCreateNode'),
  createPages: require('./gatsby/createPages'),
  createResolvers: require('./gatsby/createResolvers'),
  sourceNodes: require('./gatsby/sourceNodes'),
}
