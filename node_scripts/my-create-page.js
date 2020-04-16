const path = require('path')
const randomString = require('crypto-random-string')
const { subsetFont } = require('../utils/subset-font')

async function myCreatePage({
  createPage,
  path: pagePath,
  component,
  context,
  subfontString,
}) {

  let fontBase64
  let fontFamily
  if (subfontString) {
    fontFamily = randomString({ length: 10, characters: 'abcdef' })
    fontBase64 = await subsetFont(subfontString)
  }

  createPage({
    path: pagePath,
    component: path.resolve(component),
    context: {
      ...context,
      ...(fontBase64 && { fontFamily, fontBase64 }),
    }
  })
}

module.exports = {
  myCreatePage,
}
