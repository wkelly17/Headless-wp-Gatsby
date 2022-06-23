import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

export default function ExampleSingle(props) {
  const { wpExample } = props.data

  let markup = parse(wpExample.content)
  return (
    <div className="w-3/5 mx-auto">
      {markup}

      <p>I'm the ACF on the CPT === {wpExample.examplecpt.exampleacfcpt}</p>
    </div>
  )
}

export const query = graphql`
  query wpExample($slug: String!) {
    wpExample(slug: { eq: $slug }) {
      id
      title
      slug
      content
      examplecpt {
        exampleacfcpt
      }
    }
  }
`
