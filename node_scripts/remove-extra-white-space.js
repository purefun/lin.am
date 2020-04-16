const visit = require(`unist-util-visit`)

const regex = new RegExp(/([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d])\s*\n\s*([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d])/, 'gm');

module.exports = () => {
  return function removeExtraWhiteSpace(tree) {
    visit(tree, 'text', node => {
      if (node.type === 'text') {
        // node.value = node.value.trim().replace(/\n/gm, '').replace(/\s+/, ' ')
        // remove space between chinese characters
        node.value = node.value.replace(regex, '$1$2')
      }
    })
  }
}
