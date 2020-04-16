import { graphql } from 'gatsby'

export const Article = graphql`
  fragment Article on Mdx {
    id
    fields {
      slug
    }
    frontmatter {
      title
      createdAt(formatString: "YYYY-MM-DD")
      excerpt
      category
    }
  }
`
