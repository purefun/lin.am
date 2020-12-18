---
title: 使用 AST 完成一次艰难的小程序框架 Taro@3 的升级
topic: JavaScript
date: 2020-12-18
---

## 背景

小程序框架 [Taro][1] 在版本 3.0 升级过程中，遇到了样式不兼容性问题。在 3.0 版本
之前，在组件顶部 `import 'style.less'` 只作用于当前页面。在 3.0 的迁移指南
[从旧版本迁移到 Taro Next][2] 中明确指出：

> 页面和入口文件引入的 CSS 都会变成全局 CSS。

迁移方法是使用 CSS Modules：

```jsx
<View className="title">
// ===>
<View className={styles.title}>
```

难点在于，对 className 的赋值方式，也就是生成一个字符串的方法具有极强的灵活性。
整理了当前小程序项目所有有关 className 的写法：

```jsx
import React from 'react'
import cls from 'classnames'
import { View } from '@tarojs/components'

import styles './style.module.less'

export default class Demo extends React.Component {
  render() {
    const type = 'a-type'
    const variableClass = classNames('abc', {
      [`btn-${type}`]: true,
      'block': true,
      [`btn-block`]: true,
    })

    const x = true
    const y = false
    const z = true

    return (
      <View>
        <View className='title' />
        {/* => <View className={styles.title} */}

        <View className='mutliple subtitle primary' />
        {/* => <View className={cls(styles.mutliple, styles.subtitle, styles.primary)} */}

        <View className='kebab-case' />
        {/* => <View className={styles.kebabCase} /> */}

        <View className={cls('title', type)} />
        {/* => <View className={cls(styles.title, styles.type)} /> */}

        <View className={`abc ${x ? '' : 'close'} xyz middle ${x ? 'open' : ''} tail another`} />
        {/* => <View className={cls(styles.abc, x ? '' : styles.close, styles.xyz, styles.middle, ${x ? styles.open : ''}, styles.tail)} /> */}

        <View className={variableClass} />
        {/* => 数量很少，可以手工处理 */}
      </View>
    )
  }
}
```

导致用 IDE 去正则查找替换变得艰难。更难的在于，该小程序的规模之大，使得使用手工完成替
换成为一个几乎不可能的任务。需要升级的小程序规模：

```
js 文件：446
jsx 文件：344
涉及修改的 jsx 文件：263
className 数量：3625
需要改动的 className 数量：2981
  其中字符串字面量 (string literals)：2789
css class 数量：3413
```

## AST 工具的选择

除了编译器，在我们日常开发中也随处可见，比如 babel 使用 AST 进行进行转编译
(transpile)，eslint 使用 AST 进行代码检测等。而在上述需求中，需要一个基于 AST 的
工具。该工具提供了简单的 API，获得 className 节点，并对其进行灵活操作。一番
google 之后，很快 [ts-morph][3] 就进入我的视野。`ts-morph` 很好地实现了这次升级
的所有需求。

## ts-morph

> TypeScript Compiler API wrapper for static analysis and programmatic code
> changes.

`ts-morph` 的简介很好地阐述了用途：用代码分析和修改代码。在上一节中对小程序项目
规模的统计，也是使用 `ts-morph` 轻松实现。


### 上手 ts-morph

```ts
import { Project } from 'ts-morph'

const project = new Project()
project.addSourceFilesAtPaths('src/**/*{.js,.jsx}');

const files = project.getSourceFiles()

files.forEach(file => {
  // TODO
})
```

`ts-morph` 使用 [glob][4] 语法，很方便地对添加项目中符合条件的所有文件。下文的语
境，都在 `// TODO` 这个位置进行。


### 找到 className 这个节点

有两种方式可以找到 className，一步一步遍历，或这从所有的后代节点中抽出某一类型的
节点。`ts-morph` 均支持这两种查找方式。根据上述需求，我选择如下方法：

```ts
import { SyntaxKind, JsxAttribute } from 'ts-morph'

// 页面中可能包含 className 属性的 jsx 元素
const jsxElements = [
  ...file.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ...file.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
]

const isJsxFile = jsxElements.length > 0

if (!isJsxFile) { return }

// 遍历每一个 jsx 元素
jsxElements.forEach(jsxElement => {

  // getAttribute(): JsxAttribute | JsxSpreadAttribute
  const classNameAttribute = jsxElement.getAttribute('className') as JsxAttribute
  
  if (!classNameAttribute) return
  
  // 可以查看 classNameAttribute 在原代码中的文本
  // const text = classNameAttribute.getFullText().trim()
  
  // className 值的节点
  const classNameInitializer = classNameAttribute.getInitializer()
})
```

### 对 className 节点进行修改

`ts-morph` 所有 AST 节点都继承自 [Node][5]，Node 支持一个万能的方法
`replaceWithText(text: string)`，调用该方法的节点将被替换为新的 AST 节点，新的节
点正是给定的参数 text 解析的 AST 节点。

同时，`ts-morph` 的具体节点类型，提供了许多以 `set` 开头的方法来修改自身或者后代
节点。如 [setInitializer][6]：

```ts
class JsxAttribute extends JsxAttributeBase<ts.JsxAttribute> {
  setInitializer(textOrWriterFunction: string | WriterFunction): this;
}
```

###  case 1: className 的值为字符串的情况

因为是字符串，没有后代节点，不会有内嵌的逻辑。

```jsx
<View className='title' />
{/* => <View className={styles.title} */}

<View className='mutliple subtitle primary' />
{/* => <View className={cls(styles.mutliple, styles.subtitle, styles.primary)} */}

<View className='kebab-case' />
{/* => <View className={styles.kebabCase} /> */}
```

```ts
import { camelCase } from 'camel-case'

const strToStyle = (str: string): string => {
  if (str === '') return "''"
  return `styles.${camelCase(str)}`
}

const pureStringToStyles = (str: string): string => {
  const classes = str.split(' ')
  if (classes.length === 0) {
    return ''
  }
  if (classes.length === 1) {
    return `{${strToStyle(classes[0])}}`
  }
  const styleNames = classes.map(n => strToStyle(n)).join(', ')
  return `{\cls(${styleNames})}`
}

const classNameValue = classNameAttribute.getStructure().initializer
classNameAttribute.setInitializer(pureStringToStyles(classNameValue))
```

### case 2: className 的值为表达式

表达式是灵活的，可以很简单，比如一个三元表达式；也可以很复杂，可以用字符串模版，
还可以用一个函数返回，还可以任意嵌套。对此，从实际项目出发，整理出主要的表达式形
式。

在遍历表达式之前，需要一个所有节点类型的清单：[SyntaxKind][7]，或者可以使用
`ts-morph` 提供的 [TypesScript-AST-Viewer][8]。


#### case 2.1: 三元表达式


```jsx
const active = false

<View className={active ? 'expanded' : 'collapsed'} />
// ===>
<View className={active ? styles.expanded : styles.collapsed} />

```

```ts
const { SyntaxKind } from 'ts-morph'

const conditionExpressions = classNameAttribute.getDescendantsOfKind(
  SyntaxKind.ConditionalExpression
)

conditionExpressions.forEach(conditionExpression => {
  const stringLiterals = conditionExpression.getDescendantsOfKind(SyntaxKind.StringLiteral)
  // see: case 1
})
```

#### case 2.2: 字符串模版 Template Expression

字符串模版需要递归遍历。在 AST 中，字符串模版的节点类型有：

```ts
SyntaxKind.TemplateHead
SyntaxKind.TemplateSpan
SyntaxKind.TemplateMiddle
SyntaxKind.TemplateTail
```

具体的节点包含了哪些内容，建议是在 [TypesScript-AST-Viewer][8] 查看。

```ts
const toStyles = (tag: TemplateHead | TemplateMiddle | TemplateTail): string => {
  tag.getLiteralText().trim().forEach(str => {
      // see: case 1
  })
}

const templateExpressions = classNameAttribute.getDescendantsOfKind(SyntaxKind.TemplateExpression)

templateExpressions.forEach(templateExpression => {
  const head = templateExpression.getDescendantsOfKind(SyntaxKind.TemplateHead)
  const spans = templateExpression.getDescendantsOfKind(SyntaxKind.TemplateSpan)
  spans.getChildren().forEach(child => {
    // TemplateMiddle | TemplateTail | other types
  })
})
```

### 为了配合 className 的修改，需要添加 `import` 语句

```ts
import { SourceFile } from 'ts-morph'

export const addOrRenameClassnamesImport = (file: SourceFile) => {
  const clsImport = file.getImportDeclaration(importDeclaration => {
    return importDeclaration.getModuleSpecifierValue() === 'classnames'
  })

  if (clsImport && clsImport.getDefaultImport()!.getFullText() !== 'cls') {
    clsImport.renameDefaultImport('cls')
    return
  }

  file.addImportDeclaration({
    defaultImport: 'cls',
    moduleSpecifier: 'classnames'
  })
}

export const removeClassnamesImportIfUnused = (file: SourceFile) => {
  const clsImport = file.getImportDeclaration(importDeclaration => {
    return importDeclaration.getModuleSpecifierValue() === 'classnames'
  })

  if (!clsImport) {
    return
  }

  const refs = clsImport.getDefaultImport()!.findReferencesAsNodes()
  if (refs.length === 1) {
    clsImport.remove()
  }
}
```

## 小结

`ts-morph` (2k commits, 1.6k stars) 对这次小程序项目升级到 Taro 3.0 起到了决定性
的作用。`ts-morph` 的简单高效的 API 提供了代码改代码的能力，省去简单重复且枯燥的
修改。也许很多情况，简单的全局查找替换即可完成，但有了 `ts-morph` 的帮助，一切就
变得更加可控。

[1]: https://taro-docs.jd.com/taro/
[2]: https://docs.taro.zone/docs/migration#%E6%A0%B7%E5%BC%8F
[3]: https://github.com/dsherret/ts-morph
[4]: https://github.com/isaacs/node-glob
[5]: https://github.com/dsherret/ts-morph/blob/latest/packages/ts-morph/src/compiler/ast/common/Node.ts#L1354
[6]: https://github.com/dsherret/ts-morph/blob/latest/packages/ts-morph/src/compiler/ast/jsx/JsxAttribute.ts#L34
[7]: https://github.com/microsoft/TypeScript/blob/v4.1.3/src/compiler/types.ts#L21
[8]: https://ts-ast-viewer.com
