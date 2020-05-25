import React from 'react'
import { graphql, Link } from 'gatsby'
import css from 'styled-jsx/css'
import Layout from '../theme/Layout'

export interface TopicProps {
  id: string
  name: string
  icon: {
    childImageSharp: {
      original: {
        src: string
      }
    }
  }
  color: string
}

interface Post {
  id: string
  slug: string
  title: string
  topic: string
  date: string
}

interface IndexProps {
  data: {
    topics: {
      nodes: [TopicProps],
    },
    posts: {
      nodes: [Post]
    }
  }
}

export const Topic: React.FC<{ topic: TopicProps }> = ({ children, topic }) => {
  return (
    <div className="topic">
      <header>
        <img src={topic.icon.childImageSharp.original.src} alt={topic.name} />
        <span>{topic.name}</span>
      </header>
      <div className="posts">
        {children}
      </div>
      <style jsx>{`
        .topic {
          break-inside: avoid;
          margin-bottom: 5rem;
        }
        header {
          background: #f6f6f6;
          border-top: 1px solid ${topic.color};
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
        }
        img {
          width: 2.8rem;
          height: 2.8rem;
          object-fit: cover;
          margin-right: 2rem;
        }
        span {
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

const linkCSS = css.resolve`
  a {
    text-decoration: none;
    line-height: 2.4rem;
    color: black;
    display: flex;
    margin: 2rem 0;
  }
`

const PostLink: React.FC<{ date: string, to: string, title: string }> = ({ date, to, title }) => (
  <Link to={to} className={linkCSS.className}>
    <span className="date">{date}</span>
    <h4 className="title"><span>{title}</span></h4>
    {linkCSS.styles}
    <style jsx>{`
      .date {
        font-family: 'IBM Plex Mono';
        font-size: 1.2rem;
        color: #afafaf;
        flex: 0 0 6.3rem;
        text-align: center;
      }
      .title {
        padding: 0 0.5rem;
        margin: 0;
        font-weight: normal;
      }
      .title:hover span {
        border-bottom: 1px solid black;
      }
    `}</style>
  </Link>
)

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  const { topics, posts } = data
  return (
    <Layout>
      <div className="topics">
        {topics.nodes.map(topic => (
          <Topic key={topic.id} topic={topic}>
              <ul>
            {posts.nodes.filter(post => post.topic === topic.name).map(post => (
                <li key={post.id}>
                  <PostLink to={post.slug} title={post.title} date={post.date} />
                </li>
            ))}
              </ul>
          </Topic>
        ))}
      </div>
      <style jsx>{`
        .topics {
          column-width: 40rem;
          column-gap: 2rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style-type: none;
        }
      `}</style>
    </Layout>
  )
}

export default IndexPage

export const homeQuery = graphql`
  query HomePageQuery {
    topics: allTopicsYaml {
      nodes {
        id
        name
        icon {
          childImageSharp {
            original {
              src
            }
          }
        }
        color
      }
    }
    posts: allBlogPost(sort: {fields: date, order: DESC}) {
      nodes {
        id
        slug
        title
        topic
        date(formatString: "YYYY-MM")
      }
    }
  }
`
