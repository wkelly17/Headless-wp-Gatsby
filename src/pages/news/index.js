import React from "react"
import { graphql } from "gatsby"

function BlogIndex(props) {
  console.log({ props })

  return <pre>Blog archive</pre>
}

export const query = graphql`
  {
    wpPage(isPostsPage: { eq: true }) {
      content
      id
      slug
      title
    }
  }
`

export default BlogIndex
