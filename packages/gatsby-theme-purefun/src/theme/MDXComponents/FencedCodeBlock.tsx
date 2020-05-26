import React, {useEffect, useState, useRef} from 'react';
import Highlight, {defaultProps} from 'prism-react-renderer';
import css from 'styled-jsx/css';
import Clipboard from 'clipboard';
import rangeParser from 'parse-numeric-range';
import dracula from 'prism-react-renderer/themes/dracula';

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
const highlightDirectiveRegex = (lang) => {
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
.codeBlockContent {
  position: relative;
}

.codeBlockTitle {
  border-top-left-radius: var(--ifm-global-radius);
  border-top-right-radius: var(--ifm-global-radius);
  border-bottom: 1px solid var(--ifm-color-emphasis-200);
  font-family: var(--ifm-font-family-monospace);
  font-weight: bold;
  padding: 0.75rem var(--ifm-pre-padding);
  width: 100%;
}

.codeBlock {
  overflow: auto;
  border-radius: var(--ifm-global-radius);
}

.codeBlockWithTitle {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.copyButton {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: var(--ifm-global-radius);
  color: var(--ifm-color-white);
  cursor: pointer;
  opacity: 0;
  outline: none;
  padding: 0.4rem 0.5rem;
  position: absolute;
  right: calc(var(--ifm-pre-padding) / 2);
  top: calc(var(--ifm-pre-padding) / 2);
  visibility: hidden;
  transition: opacity 200ms ease-in-out, visibility 200ms ease-in-out,
    bottom 200ms ease-in-out;
}

.codeBlockTitle:hover + .codeBlockContent .copyButton,
.codeBlockContent:hover > .copyButton {
  visibility: visible;
  opacity: 1;
}

.codeBlockLines {
  font-family: var(--ifm-font-family-monospace);
  font-size: inherit;
  line-height: var(--ifm-pre-line-height);
  white-space: pre;
  float: left;
  min-width: 100%;
  padding: var(--ifm-pre-padding);
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
      theme={dracula}
      code={code}
      language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <>
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
              tabIndex={0}
              className={`${className} codeBlock ${codeBlockTitle ? 'codeBlockWithTitle' : ''}`}
              >
              <div ref={target} className="codeBlockLines" style={style}>
                {tokens.map((line, i) => {
                  if (line.length === 1 && line[0].content === '') {
                    line[0].content = '\n'; // eslint-disable-line no-param-reassign
                  }

                  const lineProps = getLineProps({line, key: i});

                  if (highlightLines.includes(i + 1)) {
                    lineProps.className = `${lineProps.className} docusaurus-highlight-code-line`;
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
        </>
      )}
    </Highlight>
  );
};
