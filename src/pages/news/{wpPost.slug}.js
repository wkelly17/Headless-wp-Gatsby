import React from "react"
import { graphql } from "gatsby"

function BlogSingle(props) {
  const { wpPost } = props.data

  return (
    <div className="w-3/5 mx-auto">
      You've reach a post single;
      {wpPost.title}
    </div>
  )
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
