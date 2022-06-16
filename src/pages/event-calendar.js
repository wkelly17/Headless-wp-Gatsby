import * as React from "react"
import { graphql } from "gatsby"
import { useStaticQuery, Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"
import GravityForm from "../components/gravityForms/GravityForm"

export default function EventsPage(props) {
  // const { wpPage } = props.data
  console.log(props.data)
  let { wpGfForm } = props.data

  return (
    <div className="w-3/5 mx-auto">
      {/* {page.slug} */}
      <GravityForm form={wpGfForm} formClassName="testForm" />
    </div>
  )
}

export const query = graphql`
  {
    wpPage(title: { eq: "Event Calendar" }) {
      slug
      id
      title
    }
    wpGfForm(databaseId: { eq: 6 }) {
      databaseId
      confirmations {
        message
        isDefault
        isActive
        id
        name
        type
        url
      }
      ...gravityFormFragment
    }
  }
`
