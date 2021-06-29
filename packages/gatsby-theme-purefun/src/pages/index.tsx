import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../theme/Layout'
import "./index.scss"

export const Topic: React.FC<{ topic: TopicProps }> = ({ children, topic }) => {
  return (
    <div className="topic">
      <header>
        <div className="icon">
          <img src={topic.icon.childImageSharp.fixed.src} alt={topic.name} />
        </div>
        <span>{topic.name}</span>
      </header>
      <div className="posts">
        {children}
      </div>
    </div>
  )
}


const Post: React.FC<{ date: string, to: string, title: string }> = ({ date, to, title }) => (
  <div className="index-post">
    <span className="date">{date}</span>
    <h4 className="title">
      <Link to={to} className="link">{title}</Link>
    </h4>
  </div>
)

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  const { topics, posts } = data
  return (
    <Layout title="Home">
      <div className="topics">
        {topics.nodes.map(topic => (
          <Topic key={topic.id} topic={topic}>
              <ul>
            {posts.nodes.filter(post => post.topic === topic.name).map(post => (
                <li key={post.id}>
                  <Post to={post.slug} title={post.title} date={post.date} />
                </li>
            ))}
              </ul>
          </Topic>
        ))}
      </div>
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
            fixed(height: 96, width: 96, quality: 100) {
              src
            }
          }
        }
      }
    }
    posts: allBlogPost(filter: { published: { eq: true } }, sort: {fields: date, order: DESC}) {
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
