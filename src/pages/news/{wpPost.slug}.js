import React from "react"
import { graphql } from "gatsby"

function BlogSingle(props) {
  console.log({ props })

  return <pre>Blog single</pre>
}

export const query = graphql`
  query PostContent($id: String!) {
    wpPost(id: { eq: $id }) {
      slug
      title
      id
      content
    }
  }
`

export default BlogSingle
