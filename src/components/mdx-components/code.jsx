import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import styled from 'styled-components'
import theme from '../../code-theme'

const Pre = styled.pre`
  padding: 20px;
  line-height: 20px;
  border-radius: 5px;
  overflow: scroll;
  font-family:  'Operator Mono', 'JetBrains Mono', 'Meno', 'Consolas', 'Courier New';
`

const preRender = ({
  className,
  style,
  tokens,
  getLineProps,
  getTokenProps,
}) => {
  return (
    <Pre style={style}>
      {tokens.map((line, i) => {
        return (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        )
      })}
    </Pre>
  )
}

export const code = ({ children, className, ...otherProps }) => {
  const language = className ? className.replace(/language-/, '') : 'plain'
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {preRender}
    </Highlight>
  )
}

const Code = styled.code`
  padding: 3px 6px;
  border-radius: 2px;
  white-space: nowrap;
`

const InlineCode =styled(Code)`
  display: inline-block;
  margin: 0 2px;
  line-height: 1.6rem;
`

const inlineTheme = {
  ...theme,
  plain: {
    backgroundColor: 'var(--color-hover)',
    color: 'var(--color-text)',
  },
}

export const inlineCode = ({ children, ...otherProps }) => {

  // `js |> code here`
  const [lang, sourceCode] = children.split(/\s*\|>\s*/g)
  const language = sourceCode ? lang : 'plain'

  return (
    <Highlight
      {...defaultProps}
      theme={inlineTheme}
      code={(sourceCode || children).trim()}
      language={language}
    >
    {({ tokens, getLineProps, getTokenProps, style }) => (
      <InlineCode style={style}>
      {tokens[0].map((token, key) => (
        <span key={key} {...getTokenProps({ token, key })} />
      ))}
      </InlineCode>
    )}
    </Highlight>
  )
}
