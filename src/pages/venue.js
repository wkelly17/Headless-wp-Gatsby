import * as React from "react"
import { graphql } from "gatsby"
import { useStaticQuery, Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"

export default function VenuePage(props) {
  debugger
  // const { wpPage } = props.data

  return (
    <div>
      {/* {page.slug} */}
      <div className="p-24 bg-green-400">DEFINITELY THE VENUE PAGE</div>
    </div>
  )
}

export const query = graphql`
  query {
    wpPage(slug: { eq: "venue" }) {
      slug
      id
      title
    }
  }
`
