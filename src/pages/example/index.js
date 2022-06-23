import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    allWpExample {
      nodes {
        content
        id
        examplecpt {
          exampleacfcpt
        }
      }
    }
  }
`

export default ComponentName
