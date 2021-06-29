import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import MDXComponents from './MDXComponents';
import Layout from './Layout'
import './markdown.scss'
import './SinglePost.scss'

interface SinglePostProps {
  data: {
    blogPost: Post
  }
}

const SinglePost: React.FC<SinglePostProps> = ({ data }) => {
  const { blogPost } = data
  return (
    <Layout title={blogPost.title}>
      <article className="article">
        <header>
          <h1 className="single-post-title">{blogPost.title}</h1>
          <div className="meta">
            {/* <div className="topic">{blogPost.topic}</div> */}
            <div className="date">{blogPost.date}</div>
          </div>
        </header>
        <div className="content">
          <div className="markdown">
            <MDXProvider components={MDXComponents}>
              <MDXRenderer>{blogPost.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default SinglePost

export const query = graphql`
  query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    blogPost(id: { eq: $id }) {
      id
      body
      slug
      title
      date(formatString: "MMMM DD, YYYY")
      topic
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      slug
      title
      date(formatString: "MMMM DD, YYYY")
      topic
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      slug
      title
      date(formatString: "MMMM DD, YYYY")
      topic
    }
  }
`
