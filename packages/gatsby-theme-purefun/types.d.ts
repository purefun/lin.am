interface Post {
  id: string
  slug: string
  title: string
  topic: string
  date: string
  body: string
}

interface TopicProps {
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

