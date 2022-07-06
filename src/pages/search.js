import React from "react"
import { graphql } from "gatsby"
import GravityForm from "../components/gravityForms/GravityForm"

function SearchPage(props) {
  const { data } = props
  const { wpGfForm } = data

  return (
    <div className="w-3/5 mx-auto ">
      <p>Search page:</p>
      <GravityForm form={wpGfForm} formClassName="test" />
    </div>
  )
}

export const query = graphql`
  {
    wpGfForm(databaseId: { eq: 7 }) {
      id
      title
      databaseId
      ...gravityFormFragment
    }
  }
`

export default SearchPage
