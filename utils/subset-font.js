const fs = require('fs')
const { Font, woff2 } = require('fonteditor-core')

const cache = {}
const fontBuffer = fs.readFileSync('fonts/HYWenHei-75W.ttf')

async function subsetFont(str) {
  const codes = str.split('').map((c) => c.charCodeAt(0))
  const font = Font.create(fontBuffer, {
    type: 'ttf',
    subset: codes,
    hinting: true,
  })
  await woff2.init()

  let base64 = cache[str]

  if (!base64) {
    base64 = font.toBase64({
      type: 'woff2',
    })
    cache[str] = base64
  }

  return base64
}

module.exports = {
  subsetFont,
}
