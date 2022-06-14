import React from "react"
import { graphql } from "gatsby"

function PageDefault(props) {
  console.log({ props })

  return <pre>Default page</pre>
}

export const query = graphql`
  query PageContent($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      slug
    }
  }
`

export default PageDefault
