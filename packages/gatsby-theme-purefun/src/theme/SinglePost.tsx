import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import MDXComponents from './MDXComponents';
import Layout from './Layout'
import './markdown.scss'

interface SinglePostProps {
  data: {
    blogPost: Post
  }
}

const SinglePost: React.FC<SinglePostProps> = ({ data }) => {
  const { blogPost } = data
  return (
    <Layout title={`${blogPost.title} - purefun`}>
      <article>
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
        <style jsx>{`
          article {
            max-width: 80rem;
            margin: 0 auto;
          }
          header {
          }
          .date {
            color: var(--color-gray-300);
          }
        `}</style>
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
