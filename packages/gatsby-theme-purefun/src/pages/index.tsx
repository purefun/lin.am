import React from 'react'
import { graphql } from 'gatsby'

export default function Home({ data }) {
  return (
    <>
      <h1>Home</h1>
      <style jsx>{`
      `}</style>
    </>
  )
}

export const homeQuery = graphql`
  query HomePageQuery {
    allTopicsYaml {
      nodes {
        id
        topic
        icon
        color
      }
    }
    allBlogPost(sort: {fields: date, order: DESC}) {
      group(field: topic) {
        nodes {
          id
          slug
          title
          topic
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`
