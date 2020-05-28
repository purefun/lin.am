import { PrismTheme } from 'prism-react-renderer';

export const theme: PrismTheme = {
  plain: {
    color: 'var(--fenced-text)',
    backgroundColor: 'var(--fenced-bg)',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'var(--fenced-green)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: 'var(--fenced-red)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'var(--fenced-blue)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'var(--fenced-comment)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['string', 'builtin', 'char', 'constant', 'url'],
      style: {
        color: 'var(--fenced-green)'
      }
    },
    {
      types: ['variable'],
      style: {
        color: 'var(--fenced-red)'
      }
    },
    {
      types: ['number'],
      style: {
        color: 'var(--fenced-orange)'
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'var(--fenced-purple)'
      }
    },
    {
      types: ['function', 'selector', 'doctype'],
      style: {
        color: 'var(--fenced-red)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'var(--fenced-yellow)'
      }
    },
    {
      types: ['tag'],
      style: {
        color: 'var(--fenced-green)'
      }
    },
    {
      types: ['operator', 'property', 'keyword', 'namespace'],
      style: {
        color: 'var(--fenced-green)'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: 'var(--fenced-blue)'
      }
    }
  ]};
