import React from 'react'
import Layout from '../theme/Layout'
import { graphql } from 'gatsby'

interface Jargon {
  id: string
  term: string
  category: string
  short_for?: string
  translation?: string
  def_en: string
  def_cn: string
}

interface JargonsProps {
  data: {
    jargons: {
      nodes: [Jargon]
    }
  }
}

const Columns: React.FC<{ columns: string[] }> = ({ columns: fields }) => {
  return (
    <>
      <div className="column term">{fields[0]}</div>
      <div className="column category">{fields[1]}</div>
      <div className="column translation">{fields[2]}</div>
      <div className="column short_for">{fields[3]}</div>
      <div className="column definition_en">{fields[4]}</div>
      <div className="column definition_cn">{fields[5]}</div>
      <style jsx>{`
        .column {
          padding: 0 0.5rem;
        }
        .term {
          flex: 1.4;
          font-weight: bold;
        }
        .category {
          flex: 0.6;
        }
        .translation {
          flex: 1;
        }
        .short_for {
          flex: 2;
        }
        .definition_en {
          flex: 3;
        }
        .definition_cn {
          flex: 3;
        }
      `}</style>
    </>
  )
}

const Jargon: React.FC<{ jargon: Jargon }> = ({ jargon }) => {
  const fields = [
    jargon.term,
    jargon.category,
    jargon.translation || '-',
    jargon.short_for || '-',
    jargon.def_en,
    jargon.def_cn,
  ]
  return (
    <Columns columns={fields} />
  )
}

const Jargons: React.FC<JargonsProps> = ({ data }) => {
  const { jargons } = data
  const headers = [
    'Term',
    'Category',
    'Translation',
    'Short for',
    'Definition (English)',
    'Definition (Chinese)',
  ]
  return (
    <Layout title="Jargons">
      <ul>
        <li className="row header"><Columns columns={headers} /></li>
        {jargons.nodes.map(jargon => (
          <li className="row"><Jargon jargon={jargon} /></li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          font-size: 1.4rem;
          line-height: 1.5;
        }
        .row {
          display: flex;
          border-bottom: 1px solid var(--color-gray-200);
          padding: 1rem 0;
        }
        .row:hover {
          background: var(--color-gray-100);
        }
        .row.header {
          background: var(--color-gray-100);
          font-weight: 500;
        }
      `}</style>
    </Layout>
  )
}

export default Jargons

export const query = graphql`
query AllJargonsQuery {
  jargons: allJargonsYaml {
    nodes {
      id
      term
      category
      translation
      def_cn
      def_en
      short_for
    }
  }
}
`
