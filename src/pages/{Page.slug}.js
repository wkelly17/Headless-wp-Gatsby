import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"

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
}

export default function Page(props) {
  const { page } = props.data

  return (
    <div>
      {page.title}
      <div class="p-24 bg-green-400">Tailwind</div>
      <TransitionLink
        to="/"
        exit={{
          trigger: ({ exit, node }) => interestingExitAnimation(exit, node),
          length: 0.5,
        }}
        entry={{
          trigger: ({ exit, node }) => interestingEnterAnimation(exit, node),
          delay: 0,
        }}
      >
        Go back home
      </TransitionLink>
    </div>
  )
}

// export const query = graphql`
//   query PageContent($id: String!) {}
// `
