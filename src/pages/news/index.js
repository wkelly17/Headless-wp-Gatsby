import React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Heading,
  Header,
  Button,
  List,
  ListItem,
} from "../../components/atoms"
import { Footer } from "../../components/organisms"

import { ArticlePreview } from "../../components/molecules"
import { navNewsItems, fadeInNavItems } from "../../animations/interactions"
import { AnimationContext } from "../../context/AnimationContext"

function BlogIndex(props) {
  console.log({ props })
  const data = props.data
  const { nodes: posts } = data.allWpPost
  const amount = 6
  let { transitionDurations } = React.useContext(AnimationContext)
  console.log({ transitionDurations })

  // let [limit, setLimit] = React.useState(6)
  const [limitedPosts, setLimitedPosts] = React.useState(() => {
    let final = posts.slice(0, amount)

    return {
      prevPage: 0,
      currentPage: 0,
      posts: final,
      hasNextPage: true,
      hasPrevPage: false,
      isInitial: true,
    }
  })

  React.useEffect(() => {
    let listItems = document.querySelectorAll("#news .list__item")
    listItems.forEach((item) => (item.style = ""))
    fadeInNavItems()
  }, [limitedPosts])

  function navPosts(dir) {
    let sliceVar = dir === "prev" ? -1 : 1
    let startIdx = (limitedPosts.currentPage + sliceVar) * amount //e.g. page (2 +-1) * 6) ==
    let endIdx = startIdx + amount
    let newSlice = posts.slice(startIdx, endIdx)
    let newPage = limitedPosts.currentPage + sliceVar
    let hasNextPage = endIdx < posts.length - 1
    let hasPrevPage = startIdx > 0

    // animate the two posts;  animDown new, up for back;
    let updateState = () => {
      setLimitedPosts((prevState) => {
        let newState = {
          prevPage: limitedPosts.currentPage,
          currentPage: newPage,
          posts: newSlice,
          hasNextPage,
          hasPrevPage,
          isInitial: false,
        }
        return newState
      })
    }
    navNewsItems(dir, updateState)
  }

  return (
    <>
      <Box.Main
        id="news"
        className=" grid grid-cols-20 tl:grid-cols-18  bg-white min-height-[101vh] border-b-2 d:border-b-4 border-grayDarker"
      >
        <Box
          id="news-inner"
          className="col-start-3 pt-12 pb-8 col-end-16 tl:col-end-14 tl:pt-row tl:pb-row"
        >
          <Header className="pb-8 tp:pb-12">
            <Heading className="h3"> News </Heading>
          </Header>
          <Box>
            <List className="d:h-[698px] tp:flex tp:flex-wrap d:flex-col ">
              {limitedPosts.posts.map((post, i) => {
                return (
                  <ListItem
                    style={{}}
                    key={post.title}
                    className={`${
                      !((i + 1) % 2 === 0) && "tp:mr-[14.28%]"
                    } tp:w-[41.9%] pb-12 list__item ${
                      !limitedPosts.isInitial && "opacity-0"
                    }`}
                  >
                    <ArticlePreview
                      post={post}
                      transitionDurations={transitionDurations}
                    />
                  </ListItem>
                )
              })}
            </List>
            {/* NEWS PAGINATION */}
            <Box
              id="news-pag"
              className="py-4 border-t news-page d:border-t-2 d:mt-row border-grayDarker tp:flex tp:flex-wrap text-primary"
            >
              {limitedPosts.hasPrevPage && (
                <Button
                  className="h5 !text-inherit"
                  onClick={() => navPosts("prev")}
                >
                  Older Posts
                </Button>
              )}
              {limitedPosts.hasNextPage && (
                <Box className="ml-8">
                  <Button
                    className="inline-block ml-8 h5 !text-inherit"
                    onClick={() => navPosts("next")}
                  >
                    Newer Posts
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box.Main>
      <footer id="colophon" className="h-screen ">
        <Footer />
      </footer>
    </>
  )
}

export const query = graphql`
  {
    wpPage(isPostsPage: { eq: true }) {
      content
      id
      slug
      title
    }
    allWpPost {
      nodes {
        title
        uri
        date(fromNow: true)
      }
    }
  }
`

export default BlogIndex
