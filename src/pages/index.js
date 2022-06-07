import * as React from "react"
import { graphql } from "gatsby"
import { useGetPosts, useLogin, useGravityForm } from "../api/queries"
import GravityForm from "../components/gravityForms/GravityForm"
// import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"
import { GatsbyImage } from "gatsby-plugin-image"

import { Document as flexDocument } from "flexsearch"
import { useFlexSearch } from "react-use-flexsearch"
import { ResponsiveContext } from "../context/ResponsiveContext"

export default function Homepage(props) {
  const { wpPage: homepage } = props.data

  let { Desktop } = React.useContext(ResponsiveContext)

  const interestingExitAnimation = (exit, node) => {
    // do some animation here
    gsap.to(node, {
      opacity: 0,
      duration: 0.5,
    })
  }
  const interestingEnterAnimation = (exit, node) => {
    // do some animation here
    let nestedEl = node.querySelector(".bg-green-400")
    gsap.from(node, {
      opacity: 0,
      duration: 0.5,
    })
    gsap.to(nestedEl, {
      background: "orange",
      delay: 0.2,
    })
  }

  return (
    <div>
      HomePage
      <p className="">Next thing</p>
      {/* <Desktop
        handleChange={(matches) => {
          console.log("change from desktop", matches)
        }}
      > */}
      {/* https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image#withartdirection */}
      {/* <GatsbyImage
          alt={hero.image.altText}
          image={hero.image.localFile.childImageSharp.gatsbyImageData}
        /> */}
      {/* </Desktop> */}
      <TransitionLink
        to="/contact-us"
        exit={{
          trigger: ({ exit, node }) => interestingExitAnimation(exit, node),
          length: 0.5,
        }}
        entry={{
          trigger: ({ exit, node }) => interestingEnterAnimation(exit, node),
          delay: 0.9,
        }}
      >
        Go to page 2
      </TransitionLink>
      {/* {isFetching && <p>Loading</p>} */}
      {/* {<GravityForm data={wpGfForm} />} */}
    </div>
  )
}

// export const query = graphql`
//   {
//     # homepage {
//     #   id
//     #   title
//     #   description
//     #   image {
//     #     id
//     #     url
//     #   }
//     #   blocks: content {
//     #     id
//     #     blocktype
//     #   }
//     # }
//     # wpGfForm(databaseId: { eq: 1 }) {
//     #   description
//     #   isActive
//     #   databaseId
//     #   title
//     #   ...gravityFormFragment
//     # }
//     # allLocalSearchWpSearch {
//     #   nodes {
//     #     index
//     #     store
//     #   }
//     # }
//   }
// `

export const query = graphql`
  {
    wpPage(isFrontPage: { eq: true }) {
      slug
      title
    }
  }
`
