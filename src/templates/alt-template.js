import React from "react"
import { graphql } from "gatsby"
import parse, { domToReact } from "html-react-parser"
import { Box, Heading } from "../components/atoms"
import { Footer } from "../components/organisms"

function PageSpecialTemplate(props) {
  console.log({ props })
  const data = props.data.wpPage
  const { title, content } = data

  const options = {
    replace: (domNode) => {
      if (domNode.attribs?.class?.includes("customBlock")) {
        return (
          <Box className="bg-green-200">
            {domToReact(domNode.children, options)}{" "}
          </Box>
        )
      } else if (domNode.attribs?.class?.includes("h3InCustomBlock")) {
        return (
          <Heading as="h3" className="text-primary" id="fancyAcfEffect">
            {domToReact(domNode.children, options)}
          </Heading>
        )
      }
    },
  }

  function parsedContent(content) {
    return parse(content, options)
  }

  // React.useEffect(() => {
  //   gsap.to("#fancyAcfEffect", {
  //     color: "purple",
  //     duration: 2.75,
  //     opacity: 0.8,
  //     delay: 1,
  //   })
  // }, [])

  return (
    <div>
      Title = {title}; Alt col template
      {parsedContent(content)}
      <Footer />
    </div>
  )
}

export const query = graphql`
  query SpecialTemplatePageContent($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      slug
      content
    }
  }
`

export default PageSpecialTemplate
