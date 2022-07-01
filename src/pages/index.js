import * as React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Heading,
  Button,
  SVGLinesDoors,
  IlloSputnik,
  List,
  ListItem,
  LinesRecords,
} from "../components/atoms"
import { HubPane, ArticlePreview } from "../components/molecules"
import { Head } from "../components/common"
import { Footer } from "../components/organisms"

import TransitionLink from "gatsby-plugin-transition-link"
import { GatsbyImage } from "gatsby-plugin-image"

import { ResponsiveContext } from "../context/ResponsiveContext"
import { homeScroller } from "../animations/home"
import {
  Home2EventsExit,
  Home2VenueExit,
  Home2News,
  toNewsSingleLeave,
} from "../animations/pageTransitions"
import { splitEventText } from "../animations/interactions"
import { getTransLinkProps } from "../animations/transitionLinkProps"
import { DOM } from "../constants/constants"

export default function Homepage(props) {
  //@=============== GQL DATA  =============
  const { wpPage: homepage } = props.data
  const { myOptionsPage } = props.data.allWp.nodes[0]
  const { nodes: homePosts } = props.data.allWpPost
  let { cta1, cta2, headline, textarea, tagline } = homepage.homepageAcf
  const { generalSettings } = props.data.wp
  const { title, description } = generalSettings

  //@=============== MISC  =============
  let isTransitioningFromOtherPage = props.entry?.state?.hideInitial

  //@=============== DOM STATE/EFFECTS  =============
  let { isDesktop } = React.useContext(ResponsiveContext)
  let sideScroller = React.useRef(null)
  const homeRefs = React.useRef({
    hub: null,
    hubScroller: null,
  })
  const [transitionDurations, setTransitionDurations] = React.useState()

  React.useEffect(() => {
    // note; We are passing gsap a real node, even if we will later redefined the node we use for the timeline just so we can get a duration;
    setTransitionDurations(() => {
      return {
        toEvents: Home2EventsExit({ node: homeRefs.current.hub }, true),
        toVenue: Home2VenueExit({ node: homeRefs.current.hub }, true),
        toNews: Home2News({ node: homeRefs.current.hub }, true),
        toNewsSingle: toNewsSingleLeave({ node: homeRefs.current.hub }, true),
      }
    })

    if (isDesktop) {
      homeScroller(homeRefs, sideScroller)
    } else if (sideScroller.current) {
      console.log("killing")
      sideScroller.current.scrollTrigger.kill()
      sideScroller.current.set(homeRefs.current.hub, {
        clearProps: "all",
      })
      sideScroller.current.kill(true)
      sideScroller.current = null //garbage collect;
    }
  }, [isDesktop])

  return (
    <>
      <Head title={title} description={description} />
      <Box.Main
        className={`h-screen bg-grayLight d:overflow-hidden ${
          isTransitioningFromOtherPage && "opacity-0"
        }`}
        ref={(ref) => (homeRefs.current.hub = ref)}
      >
        <Box
          id={DOM.hubScroller.id}
          className="d:flex d:h-full"
          ref={(ref) => (homeRefs.current.hubScroller = ref)}
        >
          <Box.Section
            id="hub-section-1"
            className="relative w-full d:grid-cols-10 bg-white  d:ml-[10%] d:w-1/2 flex-grow-0 flex-shrink-0"
          >
            <Box
              className="w-full h-full shadow-borderRightSm d:shadow-borderRightBg"
              data-js="firstCol"
            >
              <Box className="tagline pt-[20%] relative h4 !font-normal">
                <small className="absolute w-full -translate-y-1/2 top-1/2 px-row">
                  {tagline}
                </small>
              </Box>
              <Box className="grid py-12 d:grid-cols-10 d:pb-row h-[calc(100%-10vw)] shadow-borderTopSm d:shadow-borderTopBg">
                <Box className="self-center col-span-full d:col-start-3 d:col-span-6 ">
                  <Heading className="pb-4 h3">{headline}</Heading>
                  <p className="pb-2">{textarea}</p>
                  <Button.TransitionLink
                    type="pill"
                    to={cta1.url}
                    {...getTransLinkProps("home2Venue", transitionDurations)}
                  >
                    {cta1.title}
                  </Button.TransitionLink>

                  <Box className="pl-4 mt-2">
                    <Button.Link to={cta2.url} type="link">
                      {cta2.title}
                    </Button.Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box.Section>
          <Box
            id={DOM.homeHubSection2.id}
            className="grid grid-cols-20 d:grid-cols-6  bg-primary flex-shrink-0  d:w-[30%] flex-grow-0 "
          >
            <Box
              id={DOM.homeHubSection2Col.id}
              className="flex flex-row-reverse flex-wrap d:block col-span-full bg-tertiary shadow-borderTopSm d:shadow-borderRightBg"
            >
              <HubPane
                id={DOM.homeHubSection2Pane.id}
                classKeys={["lg", "noOverflow"]}
                className="bg-secondary"
              >
                <span
                  id={DOM.homeHubSection2Border.id}
                  className="absolute block bg-grayDarker right-0 top-0 w-full d:w-[4px] d:h-full"
                ></span>
                <Box
                  id={DOM.homeHubSection2Lines.id}
                  className="absolute -translate-x-1/2 left-1/2 top-8"
                >
                  <SVGLinesDoors />
                </Box>
              </HubPane>
              <HubPane
                id={DOM.homeHubSection2Illo.id}
                classKeys={"md"}
                className="text-grayDarker shadow-borderRightSm d:shadow-borderTopBg "
              >
                <Box className="absolute top-0 -translate-x-1/2 left-1/2">
                  <IlloSputnik
                    homepageAnimate={true}
                    sideScroller={sideScroller.current}
                  />
                </Box>
              </HubPane>
            </Box>
          </Box>
          <Box
            id={DOM.homeHubSection3.id}
            className="relative grid flex-grow-0 flex-shrink-0 h-full overflow-hidden d:w-2/5 bg-primary grid-cols-20 d:grid-cols-20"
          >
            <TransitionLink
              to="/event-calendar"
              {...getTransLinkProps("home2Events", transitionDurations)}
              className="col-span-full"
            >
              <GatsbyImage
                alt={myOptionsPage.eventCalendar.posterImage.altText}
                image={
                  myOptionsPage.eventCalendar.posterImage.localFile
                    .childImageSharp.gatsbyImageData
                }
                className="object-cover w-full h-full"
                imgClassName="bg-top"
              />
              <span
                id={DOM.homeHubSection3Border.id}
                className="absolute block bg-grayDarker right-0 top-0 w-full d:w-[4px] d:h-full"
              ></span>
              <Heading
                wrapInHeader={true}
                headerClasses="hub__section__header w-full absolute left-0 top-1/2 -translate-y-1/2 "
                as="h2"
                className={"h4 !text-white text-center"}
                id={DOM.homeHubSection3Split.id}
                split={{
                  getter: DOM.homeHubSection3Split.get,
                  fxn: splitEventText,
                }}
              >
                Event Calendar
              </Heading>
            </TransitionLink>
          </Box>

          <Box.Section
            id={DOM.homeHubSection4.id}
            className="flex-grow-0 flex-shrink-0 w-[90%] relative grid bg-white"
          >
            {/* <span
            id="hub-section-4-border"
            className="absolute block bg-grayDarker right-0 top-0 w-full d:w-[4px] d:h-full"
          ></span> */}
            <Box
              className="relative col-span-full d:col-span-18"
              id={DOM.homeHubSection4Col.id}
            >
              <HubPane
                className={
                  "grid grid-cols-20 d:grid-cols-18 py-12 d:pt-row d:pb-0"
                }
              >
                <Box className="relative col-start-3 col-span-16 d:col-start-3 d:col-span-14">
                  <Box className="grid pb-8 grid-cols-18 d:grid-cols-14 tp:pb-12">
                    <Box className="col-span-full d:col-span-6">
                      <Heading className={"h3 "}>News</Heading>
                    </Box>
                  </Box>
                  <List
                    className="d:h-[698px] tp:flex tp:flex-wrap d:flex-col "
                    id={DOM.homeHubSection4List.id}
                  >
                    {homePosts.map((post, i) => {
                      return (
                        <ListItem
                          key={post.title}
                          className={`${
                            !i % 2 === 0 && "tp:mr-[14.28%]"
                          } tp:w-[42.9%] pb-12`}
                        >
                          <ArticlePreview
                            post={post}
                            isHomePage={true}
                            transitionDurations={transitionDurations}
                          />
                        </ListItem>
                      )
                    })}
                  </List>
                  <Button.TransitionLink
                    to="news"
                    id={DOM.homeHubSection4Btn.id}
                    type="pill"
                    className="d:left-[45%] !absolute top-0 -translate-x-full translate-y-2"
                    {...getTransLinkProps("home2News", transitionDurations)}
                  >
                    All News
                  </Button.TransitionLink>
                </Box>
              </HubPane>
            </Box>
          </Box.Section>
          <Box
            id={DOM.homeHubSection5.id}
            className="grid grid-cols-20 d:grid-cols-6 d:w-[30%] d:ml-[-40%] flex-shrink-0 flex-grow-0 z-10 relative"
          >
            <Box className="dmax:flex-wrap dmax:flex-row-reverse dmax:flex bg-secondary shadow-borderTopSm d:shadow-borderRightBg col-span-full">
              <HubPane
                classKeys={["md", "noOverflow"]}
                className="bg-tertiary shadow-borderTopSm d:shadow-borderRightBg bg-[url('../images/pattern-dots.svg')]"
              ></HubPane>
              <HubPane
                classKeys={["lg", "noOverflow"]}
                className="text-grayDarker shadow-borderRightSm d:shadow-borderTopBg"
              >
                <Box
                  id={DOM.homeHubLinesRecords.id}
                  className="absolute right-0 -translate-x-8 -translate-y-1/2 top-1/2"
                >
                  <LinesRecords
                    sideScroller={sideScroller.current}
                    homePageAnim={true}
                  />
                </Box>
              </HubPane>
            </Box>
            <span className="absolute block bg-grayDarker right-auto left-0 top-0 w-full d:w-[4px] d:h-full"></span>
          </Box>
          <Box.Section
            id={DOM.homeHubSection6.id}
            className="grid flex-grow-0 flex-shrink-0 d:grid-cols-18 dmax:shadow-borderTopSm w-[90%] z-[2]"
          >
            <Box className="col-span-full">
              <Footer sideScroller={sideScroller.current} />
            </Box>
          </Box.Section>
        </Box>
      </Box.Main>
    </>
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
      homepageAcf {
        cta1 {
          target
          title
          url
        }
        cta2 {
          target
          title
          url
        }
        headline
        textarea
        tagline
      }
    }
    allWp {
      nodes {
        myOptionsPage {
          bookingForm {
            bookingHeadline
            bookingTextarea
            fieldGroupName
          }
          eventCalendar {
            fieldGroupName
            posterImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
              altText
            }
          }
        }
      }
    }
    allWpPost(limit: 6) {
      nodes {
        uri
        link
        title
        date(fromNow: true)
      }
    }
    wp {
      ...seoFragment
    }
  }
`
