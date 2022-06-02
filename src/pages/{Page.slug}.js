import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

export default function Page(props) {
  const { page } = props.data

  return (
    <div>
      {page.title}
      <div class="p-24 bg-green-400">Tailwind</div>
    </div>
  )
}

export const query = graphql`
  query PageContent($id: String!) {
    page(id: { eq: $id }) {
      id
      title
      slug
      description
      image {
        id
        url
      }
      html
    }
  }
`
