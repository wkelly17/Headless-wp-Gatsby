import { graphql } from "gatsby"

export const seoFragment = graphql`
  fragment seoFragment on Wp {
    generalSettings {
      title
      description
    }
  }
`
