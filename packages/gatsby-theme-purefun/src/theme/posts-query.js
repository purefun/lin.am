import { graphql } from 'gatsby'
import PostsPage from './posts-page'

export default PostsPage

export const query = graphql`
  query PostsQuery {
    allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          topic
        }
      }
    }
  }
`
