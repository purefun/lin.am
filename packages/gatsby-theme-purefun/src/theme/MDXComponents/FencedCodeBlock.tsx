import React, {useEffect, useState, useRef} from 'react';
import Highlight, {defaultProps} from 'prism-react-renderer';
import css from 'styled-jsx/css';
import Clipboard from 'clipboard';
import rangeParser from 'parse-numeric-range';
import { theme } from './code-block-theme';

const highlightLinesRangeRegex = /{([\d,-]+)}/;
const getHighlightDirectiveRegex = (
  languages = ['js', 'jsBlock', 'jsx', 'python', 'html'],
) => {
  // supported types of comments
  const comments = {
    js: {
      start: '\\/\\/',
      end: '',
    },
    jsBlock: {
      start: '\\/\\*',
      end: '\\*\\/',
    },
    jsx: {
      start: '\\{\\s*\\/\\*',
      end: '\\*\\/\\s*\\}',
    },
    python: {
      start: '#',
      end: '',
    },
    html: {
      start: '<!--',
      end: '-->',
    },
  };
  // supported directives
  const directives = [
    'highlight-next-line',
    'highlight-start',
    'highlight-end',
  ].join('|');
  // to be more reliable, the opening and closing comment must match
  const commentPattern = languages
    .map(
      (lang) =>
        `(?:${comments[lang].start}\\s*(${directives})\\s*${comments[lang].end})`,
    )
    .join('|');
  // white space is allowed, but otherwise it should be on it's own line
  return new RegExp(`^\\s*(?:${commentPattern})\\s*$`);
};
// select comment styles based on language
const highlightDirectiveRegex = (lang: string) => {
  switch (lang) {
    case 'js':
    case 'javascript':
    case 'ts':
    case 'typescript':
      return getHighlightDirectiveRegex(['js', 'jsBlock']);

    case 'jsx':
    case 'tsx':
      return getHighlightDirectiveRegex(['js', 'jsBlock', 'jsx']);

    case 'html':
      return getHighlightDirectiveRegex(['js', 'jsBlock', 'html']);

    case 'python':
    case 'py':
      return getHighlightDirectiveRegex(['python']);

    default:
      // all comment types
      return getHighlightDirectiveRegex();
  }
};
const codeBlockTitleRegex = /title=".*"/;

const styles = css`
.codeBlockWrapper {
  font-size: 1.4rem;
}
.codeBlockContent {
  position: relative;
}

.codeBlockTitle {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid var(--fenced-title-border);
  font-weight: bold;
  padding: 0.75rem 1.6rem;
  overflow: auto;
}

.codeBlock {
  overflow: auto;
  border-radius: 8px;
}

.codeBlockWithTitle {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.highlight-code-line {
  padding: 0 1.6rem 0 calc(1.6rem - 2px);
  margin: 0 -1.6rem;
  border-left: 2px solid var(--color-primary);
  background: rgba(0,0,0,0.05);
}

.copyButton {
  background: rgba(0,0,0, 0.05);
  border: none;
  border-radius: 4px;
  color: green;
  cursor: pointer;
  opacity: 1;
  outline: none;
  padding: 0.4rem 0.5rem;
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  font-size: 1.2rem;
}

.codeBlockLines {
  font-size: inherit;
  white-space: pre;
  float: left;
  min-width: 100%;
  padding: 1.6rem;
}
`

export default ({children, className: languageClassName, metastring}) => {
  const [showCopied, setShowCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const target = useRef(null);
  const button = useRef(null);
  let highlightLines = [];
  let codeBlockTitle = '';

  if (metastring && highlightLinesRangeRegex.test(metastring)) {
    const highlightLinesRange = metastring.match(highlightLinesRangeRegex)[1];
    highlightLines = rangeParser(highlightLinesRange)
      .filter((n) => n > 0);
  }

  if (metastring && codeBlockTitleRegex.test(metastring)) {
    codeBlockTitle = metastring
      .match(codeBlockTitleRegex)[0]
      .split('title=')[1]
      .replace(/"+/g, '');
  }

  useEffect(() => {
    let clipboard;

    if (button.current) {
      clipboard = new Clipboard(button.current, {
        target: () => target.current,
      });
    }

    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, [button.current, target.current]);

  let language =
    languageClassName && languageClassName.replace(/language-/, '');

  /* if (!language && prism.defaultLanguage) { */
  /*   language = prism.defaultLanguage; */
  /* } */

  // only declaration OR directive highlight can be used for a block
  let code = children.replace(/\n$/, '');
  if (highlightLines.length === 0 && language !== undefined) {
    let range = '';
    const directiveRegex = highlightDirectiveRegex(language);
    // go through line by line
    const lines = children.replace(/\n$/, '').split('\n');
    let blockStart;
    // loop through lines
    for (let index = 0; index < lines.length; ) {
      const line = lines[index];
      // adjust for 0-index
      const lineNumber = index + 1;
      const match = line.match(directiveRegex);
      if (match !== null) {
        const directive = match
          .slice(1)
          .reduce((final, item) => final || item, undefined);
        switch (directive) {
          case 'highlight-next-line':
            range += `${lineNumber},`;
            break;

          case 'highlight-start':
            blockStart = lineNumber;
            break;

          case 'highlight-end':
            range += `${blockStart}-${lineNumber - 1},`;
            break;

          default:
            break;
        }
        lines.splice(index, 1);
      } else {
        // lines without directives are unchanged
        index += 1;
      }
    }
    highlightLines = rangeParser(range);
    code = lines.join('\n');
  }

  const handleCopyCode = () => {
    window.getSelection().empty();
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Highlight
      {...defaultProps}
      key={mounted}
      theme={theme}
      code={code}
      language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div className="codeBlockWrapper">
          {codeBlockTitle && (
            <div style={style} className="codeBlockTitle">
              {codeBlockTitle}
            </div>
          )}
          <div className="codeBlockContent">
            <button
              ref={button}
              type="button"
              aria-label="Copy code to clipboard"
              className={`copyButton ${ codeBlockTitle ? 'copyButtonWithTitle' : ''}`}
              onClick={handleCopyCode}>
              {showCopied ? 'Copied' : 'Copy'}
            </button>
            <div
              className={`${className} codeBlock ${codeBlockTitle ? 'codeBlockWithTitle' : ''}`}
              >
              <div ref={target} className="codeBlockLines" style={style}>
                {tokens.map((line, i) => {
                  if (line.length === 1 && line[0].content === '') {
                    line[0].content = '\n'; // eslint-disable-line no-param-reassign
                  }

                  const lineProps = getLineProps({line, key: i});

                  if (highlightLines.includes(i + 1)) {
                    lineProps.className = `${lineProps.className} highlight-code-line`;
                  }

                  return (
                    <div key={i} {...lineProps}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({token, key})} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      )}
    </Highlight>
  );
};
