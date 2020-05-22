module.exports = ({ actions, schema }/* , pluginOptions */) => {
  require('./create-post-schema')({ actions, schema })
}
