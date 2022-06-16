import * as React from "react"
import { graphql } from "gatsby"
import { useStaticQuery, Link } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"
import {
  Box,
  Heading,
  Header,
  Button,
  SVGLinesDoors,
} from "../components/atoms"

export default function VenuePage(props) {
  const { wpPage, allWp } = props.data
  const {
    detailsCta,
    detailsGallery1,
    detailsHeadline,
    detailsImg2,
    detailsImg3,
    detailsItems,
    detailsTextarea,
    heroImg,
    occasionsHeadline,
    occasionsImg1,
    occasionsImg2,
    occasionsImg3,
    occasionsItems,
    occasionsTextarea,
  } = wpPage.venueAcfFields

  const { virtualTourLink } = allWp.nodes[0].myOptionsPage

  return (
    <Box.Main id="venue" className="bg-white d:ml-row2">
      <Box
        id="venue-intro"
        className="relative h-auto text-center bg-secondary d:border-b-4 d:border-grayDarker"
      >
        <Header
          className={"venue__header min-h-screen overflow-hidden relative"}
        >
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

            <GatsbyImage
              alt={heroImg.altText}
              image={getImage(heroImg.localFile)}
              className="object-cover w-full h-full left-0 absolute top-0 invisible z-[1]"
            />
          </Box>
        </Header>
      </Box>
      <Box className="grid grid-cols-20 d:grid-cols-18">
        <Box className="col-span-full d:col-span-11 venue_col">
          <Box className="venue_page "></Box>
        </Box>
      </Box>
    </Box.Main>
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
            childrenImageSharp {
              gatsbyImageData
            }
          }
        }
        detailsHeadline
        detailsImg2 {
          altText
          localFile {
            childrenImageSharp {
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
            childrenImageSharp {
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
