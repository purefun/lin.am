import { graphql } from 'gatsby'
import PostPage from './post-page'

export default PostPage

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
