import React from "react"
import { graphql } from "gatsby"
import { Box, Heading, Header, Button, Text, If } from "../components/atoms"
import { Sidebar, LightBox } from "../components/molecules"

// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import parse from "html-react-parser"
import { replaceOptions } from "../utilities/acfBlocks"

function PageDefault(props) {
  console.log({ props })
  let { wpPage } = props.data
  let { node: pageParent } = wpPage.wpParent
  let pageSummaryTextarea =
    wpPage.template?.pageSummary?.pageSummaryTextarea || null
  let gallery = wpPage.template?.imageGallery?.gallery || null
  let pageSiblings = pageParent.wpChildren?.nodes || null
  let ownChildren = wpPage.wpChildren?.nodes || null
  function parsedContent(content) {
    return parse(content, replaceOptions)
  }

  let [imageGalleryIsOpen, setImageGalleryIsOpen] = React.useState(false)

  return (
    <div>
      <Box.Main className="bg-white">
        <Box.Article className="grid pt-8 grid-cols-20 tl:grid-cols-18 tl:pt-row2 pb-row2">
          <Box className="col-start-3 col-end-16 tl-col-end-14">
            <Header className="grid pb-8 grid-cols-20 tl:grid-cols-14 tl:pb-row">
              <Box className="col-span-full tl:col-end-9">
                <Box className="pb-8 -translate-y-full d:pb-0">
                  <Button.Link type="link" className="btn-link-left">
                    <Link to={pageParent.uri} className="">
                      <Text.Inline className="inline-block ml-2 font-normal text-grayDarker">
                        {pageParent.title}
                      </Text.Inline>
                    </Link>
                  </Button.Link>
                </Box>
                <Heading className="pb-8 h3">{wpPage.title}</Heading>
                <If
                  data={pageSummaryTextarea}
                  component={<Text>{pageSummaryTextarea}</Text>}
                />
                <If
                  data={gallery}
                  component={
                    <Button
                      type="pill"
                      onClick={() => {
                        setImageGalleryIsOpen(true)
                      }}
                    >
                      Image Gallery
                    </Button>
                  }
                />
                <Button.Link type="link" className={"ml-4"}>
                  Book Event Form Link
                </Button.Link>
              </Box>
            </Header>
            <Box className="grid grid-cols-20 tl:grid-cols-14">
              <Box className="pb-8 col-span-full tl:col-span-9 d:pb-0 theContent">
                {/* {parse(wpPage.content, domReplaceOptions)} */}
                {parsedContent(wpPage.content)}
              </Box>
              <Box className="col-span-full tl:col-start-12 tl:col-span-3">
                <Heading as="h5" className="pb-4 ">
                  In this section
                </Heading>
                <Sidebar
                  parent={pageParent}
                  siblings={pageSiblings}
                  ownChildren={ownChildren}
                />
              </Box>
            </Box>
          </Box>
        </Box.Article>
      </Box.Main>
      <If
        data={gallery && gallery.length}
        component={
          <LightBox
            images={gallery}
            isOpen={imageGalleryIsOpen}
            setIsOpen={setImageGalleryIsOpen}
          />
        }
      />
    </div>
  )
}

export const query = graphql`
  query PageContent($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      slug
      content
      uri
      nodeType
      wpParent {
        node {
          uri
          ... on WpPage {
            id
            title
            wpChildren {
              nodes {
                id
                uri
                ... on WpPage {
                  id
                  title
                  uri
                  slug
                }
              }
            }
          }
        }
      }
      wpChildren {
        nodes {
          id
          ... on WpPage {
            id
            title
            link
            slug
          }
        }
      }
      template {
        ... on WpDefaultTemplate {
          templateName
          pageSummary {
            pageSummaryTextarea
          }
          imageGallery {
            gallery {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                id
              }
              altText
            }
          }
        }
      }
    }
  }
`

export default PageDefault
