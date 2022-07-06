import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { DOM } from "../constants/constants"
import {
  Box,
  Heading,
  Header,
  Button,
  List,
  ListItem,
  SVGLinesDoors,
  IlloToothPickSvg,
  IlloSputnik,
  LinesSteroSvg,
  SVGMartini,
  Text,
} from "../components/atoms"
import { HubPane, VenueSwiper } from "../components/molecules"
import { Footer } from "../components/organisms"
import {
  VenueHeroSt,
  animateVenueToothPick,
  animateVenueIlloSputnik,
  venueLinesStereo,
  tlVenueMartini,
} from "../animations/interactions"
import illoToothpick from "../images/illo-toothpick.svg"
import sputnikPatternDots from "../images/pattern-dots.svg"
import sputnikBg from "../images/sputnik-bg.svg"

export default function VenuePage(props) {
  const { wpPage, allWp } = props.data
  const {
    detailsCta,
    detailsGallery1,
    // detailsHeadline,
    detailsImg2,
    detailsImg3,
    detailsItems,
    // detailsTextarea,
    heroImg,
    occasionsHeadline,
    occasionsImg1,
    occasionsImg2,
    occasionsImg3,
    occasionsItems,
    occasionsTextarea,
  } = wpPage.venueAcfFields

  const { virtualTourLink } = allWp.nodes[0].myOptionsPage

  React.useEffect(() => {
    animateVenueToothPick()
    animateVenueIlloSputnik()
    venueLinesStereo()
    tlVenueMartini()
  }, [])

  return (
    <>
      <Box.Main id={DOM.venue.id} className="bg-white ">
        <Box
          id={DOM.venueIntro.id}
          className="relative h-auto text-center bg-secondary d:border-b-4 d:border-grayDarker"
        >
          <Header className={"venue__header overflow-hidden relative"}>
            <Box className="relative venue_title d:flex d:h-row2 d:justify-center d:translate-y-1/2 d:items-center">
              <Button.LinkExternal
                to={virtualTourLink.url}
                target="_blank"
                rel="nofollow"
                type="link"
                className="mr-4 translate-y-1/2"
              >
                <span className="font-normal">Virtual Tour</span>
              </Button.LinkExternal>
              <Heading as="h1" className="h2">
                <span>Venue</span>
              </Heading>
              <Button.LinkExternal
                to={virtualTourLink.url}
                target="_blank"
                rel="nofollow"
                type="link"
                className="ml-4 translate-y-1/2"
              >
                <span className="font-normal">Book Event</span>
              </Button.LinkExternal>
            </Box>
            <Box className="pb-12 d:py-row">
              <Box className="pt-row2 d:pt-8">
                <SVGLinesDoors />
              </Box>
              <Box
                id={DOM.venueHero.id}
                className="w-full h-full left-0 top-0  z-[1] absolute opacity-0 invisible"
              >
                <GatsbyImage
                  alt={heroImg.altText}
                  image={getImage(heroImg.localFile)}
                  loading="eager"
                  className="w-full h-full"
                  onLoad={(e) => {
                    VenueHeroSt()
                  }}
                  imgClassName="w-full h-full object-cover !opacity-100 heroImg visible"
                />
              </Box>
            </Box>
          </Header>
        </Box>
        <Box className="grid h-auto min-h-screen grid-cols-20 d:grid-cols-18">
          <Box className="col-span-full d:col-span-11 venue_col dmax:flex dmax:flex-wrap dmax:flex-row-reverse ">
            <HubPane
              className={"bg-primary "}
              classKeys={["half", "noOverflow"]}
            >
              <Box classname="">
                <VenueSwiper detailsGallery1={detailsGallery1} />
              </Box>
            </HubPane>

            <HubPane
              className={" grid grid-cols-11 bg-tertiary "}
              classKeys={["half"]}
            >
              <Box className="col-start-1 col-end-7 venue__pane__item hub__pane grid__col">
                <GatsbyImage
                  alt={detailsImg3.altText}
                  image={getImage(detailsImg3.localFile)}
                  className="hubPaneObj block w-full h-full object-cover object-[center-top]"
                  imgClassName=""
                />
                {/* toothpick */}
              </Box>
              <Box
                id={DOM.illoToothpick.id}
                className="relative col-start-8 col-end-4 overflow-hidden "
                style={{
                  background: `url(${illoToothpick}) 40% 56.0352% / 150% no-repeat`,
                }}
              >
                <Box className="absolute bottom-0 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <IlloToothPickSvg
                    id={DOM.illoToothpick.id}
                    className="fill-current w-[20vw] d:w-[10vw] overflow-hidden"
                  />
                </Box>
              </Box>
            </HubPane>
          </Box>
          <Box className="d:col-start-12 d:col-end-7 ">
            <HubPane className={""} classKeys="xl">
              <GatsbyImage
                alt={detailsImg2.altText}
                image={getImage(detailsImg2.localFile)}
                className="hubPaneObj block w-full h-full object-cover object-[center-top]"
                imgClassName=""
              />
            </HubPane>
          </Box>
        </Box>
        <Box.Section className="relative h-auto border-b-2 border-grayDarker d:border-b-4">
          <Box className="grid grid-cols-20 d:grid-cols-18 py-row2">
            <Box className="col-start-3 col-end-16 d:col-start-6 d:col-end-8">
              <Heading className="pb-2 h3">A Historic Space</Heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
                sint velit. Quia saepe, consequatur dolor unde odio eum
                accusamus recusandae. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Molestias quae aperiam veritatis, doloremque
                commodi nam.
              </p>
              <Button.LinkExternal type="link" to="#">
                Take a virtual tour
              </Button.LinkExternal>
            </Box>
          </Box>
          <Box className="grid grid-cols-20 d:grid-cols-18 ">
            <Box className="col-start-3 col-end-16 d:col-start-3 d:col-end-14">
              <List className="tp:flex tp:flex-wrap">
                {detailsItems.map((field, idx) => {
                  return (
                    <ListItem
                      className={`${
                        idx % 2 === 0 && "tp:mr-[14%]"
                      } tp:w-[42.8%] d:pb-8 pb-4`}
                    >
                      <Heading className="pt-2 h5">{field.headline}</Heading>
                      <p className="mb-4">{field.textarea}</p>
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          </Box>
          <Box className="grid text-center grid-cols-20 d:grid-cols-18 pt-row pb-row2">
            <Box className="col-start-3 col-end-14">
              <Button.Link
                to={detailsCta.url}
                target={detailsCta.target}
                type="pill"
              >
                {detailsCta.title}
              </Button.Link>
            </Box>
          </Box>
        </Box.Section>
        <Box
          id={DOM.venueIlloSputnik.id}
          className="relative h-auto border-b-2 !bg-tertiary border-grayDarker d:border-b-4"
          style={{
            background: `url(${sputnikPatternDots})`,
          }}
        >
          <span
            id={DOM.venueIlloSputnikSvg.id}
            className="block h-[50vh] relative w-[50vh] d:after:w-[80vw] after:bg-tertiary after:content-[''] after:block after:h-full after:left-[99%] after:absolute after:top-0  after:w-full"
            style={{
              background: `url(${sputnikBg}) no-repeat 0/contain`,
            }}
          >
            <IlloSputnik className="absolute left-0 -translate-y-1/2 top-1/2 z-[1]" />
          </span>
        </Box>
        <Box className="relative grid h-auto border-b-2 grid-cols-20 d:grid-cols-18 border-grayDarker d:border-b-4">
          <Box className="col-1 col-span-full d:col-end-7 d:border-r-4 d:border-r-grayDarker">
            <HubPane classKeys="xl">
              <GatsbyImage
                alt={occasionsImg1.altText}
                image={getImage(occasionsImg1.localFile)}
                className="hubPaneObj block w-full h-full object-cover object-[center-top]"
                imgClassName=""
              />
            </HubPane>
          </Box>
          <Box className="col-2 col-span-full d:col-start-8 d:col-end-11">
            <HubPane className="innerPane" classKeys={"half"}>
              <GatsbyImage
                alt={occasionsImg2.altText}
                image={getImage(occasionsImg2.localFile)}
                className="hubPaneObj block w-full h-full object-cover object-[center-top]"
                imgClassName=""
              />
            </HubPane>
            <HubPane
              className="grid border-t-2 innerPane d:border-t-4 border-grayDarker grid-cols-20 d:grid-cols-11"
              classKeys={"half"}
            >
              <Box className="col-end-7 border-r-2 innerPaneObjects col-span-full d:border-r-4 border-grayDarker ">
                <GatsbyImage
                  alt={occasionsImg3.altText}
                  image={getImage(occasionsImg3.localFile)}
                  className="hubPaneObj block w-full h-full object-cover object-[center-top]"
                  imgClassName=""
                />
              </Box>

              <HubPane
                id={DOM.venueLinesStereo.id}
                className="col-start-8 col-end-4 innerPaneObjects bg-secondary col-span-full "
                classKeys={["noOverflow"]}
              >
                <Box className="absolute transform -translate-half hub__lines hub__lines--top top-8 left-1/2">
                  <LinesSteroSvg />
                </Box>
              </HubPane>
            </HubPane>
          </Box>
        </Box>
        <Box.Section className="relative border-b-2 d:border-b-4 border-grayDarker">
          <Box className="grid grid-cols-20 d:grid-cols-18 py-row2">
            <Box className="col-start-3 col-end-16 d:col-start-6 d:col-end-8">
              <Heading as="h3" className="pb-4">
                {occasionsHeadline}
              </Heading>
              <p>{occasionsTextarea}</p>
            </Box>
          </Box>

          <Box className="grid grid-cols-20 d:grid-cols-18 pb-row2">
            <Box className="col-start-3 col-span-16 d:col-end-14 ">
              <List className={"tp:flex tp:flex-wrap"}>
                {occasionsItems.map((item, idx) => {
                  return (
                    <ListItem
                      key={item.headline}
                      className={`pb-8 tp:w-[28%] ${
                        (idx === 0 || !((idx + 1) % 3 === 0)) && "tp:mr-[7%]"
                      }`}
                    >
                      <Heading as="h3" className="pb-2 h5">
                        {item.headline}
                      </Heading>
                      <Text className="mb-[1em]">{item.textarea}</Text>
                      <Button.Link
                        type="link"
                        to={item.cta.url}
                        target={item.cta.target}
                      >
                        {item.cta.title}
                      </Button.Link>
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          </Box>
          <Box className="grid grid-cols-20 d:grid-cols-18 pb-row2">
            <Box className="col-start-3 text-center col-end-14">
              <Button.Link type="pill" to={"/"}>
                {/* todo: fetch data from af for this */}
                Book an Event
              </Button.Link>
            </Box>
          </Box>
          <Box>
            <SVGMartini />
          </Box>
        </Box.Section>
      </Box.Main>
      <footer id={DOM.colophon.id} className="h-screen ">
        <Footer />
      </footer>
    </>
  )
}

export const query = graphql`
  {
    wpPage(slug: { eq: "venue" }) {
      slug
      id
      title
      venueAcfFields {
        detailsCta {
          target
          title
          url
        }
        detailsGallery1 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        detailsHeadline
        detailsImg2 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        detailsImg3 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        detailsItems {
          fieldGroupName
          headline
          textarea
        }
        detailsTextarea
        fieldGroupName
        heroImg {
          altText
          publicUrl
          localFile {
            childImageSharp {
              gatsbyImageData(formats: AUTO, placeholder: BLURRED)
            }
          }
        }
        occasionsHeadline
        occasionsImg1 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        occasionsImg2 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        occasionsImg3 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        occasionsItems {
          cta {
            target
            title
            url
          }
          fieldGroupName
          headline
          textarea
        }
        occasionsTextarea
      }
    }
    allWp {
      nodes {
        myOptionsPage {
          virtualTourLink {
            fieldGroupName
            url
          }
        }
      }
    }
  }
`
