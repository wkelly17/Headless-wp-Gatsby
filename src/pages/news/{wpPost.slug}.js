import React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Heading,
  Header,
  List,
  ListItem,
  Button,
} from "../../components/atoms"
import { Footer } from "../../components/organisms"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import parse, { domToReact } from "html-react-parser"

function BlogSingle(props) {
  const { wpPost, wpPage, allWpPost } = props.data
  let featuredImage = wpPost.featuredImage?.node
  let postsPage = wpPage
  let recentPosts = allWpPost.nodes
  debugger

  return (
    <div className="">
      <Box.Main className="border-b-2 border-grayDarker">
        <Box.Article className="grid py-8 grid-cols-20 tl:grid-cols-18 tl:py-row2">
          <Box className="col-start-3 tl:col-start-4 col-end-16 tl:col-end-12">
            <Header className={"pb-8 d:pb-12"}>
              <Box className="pb-8 d:pb-0">
                <Button.Link
                  type={"link"}
                  className="text-grayDark"
                  to={postsPage.link}
                >
                  <span className="font-normal">{postsPage.title}</span>
                </Button.Link>
              </Box>
              <Heading className="pb-8 h3">{wpPost.title}</Heading>
              <Box>
                {featuredImage && (
                  <GatsbyImage
                    alt={featuredImage.altText}
                    image={getImage(featuredImage.localFile)}
                    loading="eager"
                  />
                )}
              </Box>
            </Header>
            <Box>
              {" "}
              {/* content outter */}
              <Box className="grid grid-cols-20 tl:grid-cols-12">
                <Box className="col-span-full tl:col-start-2 tl:col-end-10">
                  <Box className="theContent">{parse(wpPost.content)}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box.Article>
        {/* RELATED */}
        {recentPosts.length && (
          <Box.Section className="grid border-t-2 d:border-t-4 border-grayDarker pb-row3 pt-row2 tl:grid-cols-18 grid-cols-20">
            <Box className="col-start-3 col-end-16 tl:col-end-14">
              <Heading as="h2" className="text-center h4 pb-row2">
                More Articles
              </Heading>
              <List class="tp:flex ">
                {recentPosts.map((post, idx) => {
                  return (
                    <ListItem
                      className={`inline w-1/3 mr-row last-of-type:mr-0 pb-8`}
                    >
                      <Box.Article className="flex flex-col ">
                        <Heading as="h3" className="order-1 pb-2 h5">
                          <Link
                            to={post.uri}
                            className="transition-colors duration-300 text-grayDarker hover:text-primary"
                          >
                            {post.title}
                          </Link>
                        </Heading>
                        <Button.Link
                          to={post.uri}
                          type="link"
                          className={"order-3 text-grayDarker "}
                        >
                          Learn More
                        </Button.Link>
                        <Box.Footer className="inline-flex items-center order-2 pb-2 h6">
                          <time datetime={post.date}>{post.dateGmt} </time>
                        </Box.Footer>
                      </Box.Article>
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          </Box.Section>
        )}
      </Box.Main>
      <footer id="colophon" className="h-screen ">
        <Footer />
      </footer>
    </div>
  )
}

export const query = graphql`
  query PostContent($id: String!) {
    wpPost(id: { eq: $id }) {
      slug
      title
      id
      content
      uri
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    wpPage(isPostsPage: { eq: true }) {
      content
      id
      slug
      title
      link
    }
    allWpPost(
      limit: 3
      filter: { id: { ne: $id }, status: { eq: "publish" } }
    ) {
      nodes {
        slug
        title
        id
        content
        uri
        date(formatString: "M/D/Y")
        dateGmt(fromNow: true)
      }
    }
  }
`

export default BlogSingle
