import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Heading, Header } from "../components/atoms"
import { HubPane, EventsCalItems } from "../components/molecules"
import { Footer } from "../components/organisms"
import { useGetTicketMaster } from "../api/queries"
import { splitEventText } from "../animations/interactions"
import { DOM } from "../constants/constants"

export default function EventsPage(props) {
  // const { wpPage } = props.data
  console.log(props.data)
  const { myOptionsPage } = props.data.allWp.nodes[0]
  const { isLoading, isError, data } = useGetTicketMaster()

  console.log({ isLoading, isError, data })

  // let { wpGfForm } = props.data

  return (
    <Box.Main
      className="text-black bg-white border-b-2 d:border-b-4 border-grayDarker"
      id={DOM.calendar.id}
    >
      {/* {page.slug} */}
      <Box className="">
        <Box className="relative flex-grow-0 flex-shrink-0 h-full ">
          <HubPane
            classKeys={["xl", "noOverflow"]}
            className="relative bg-primary d:h-[60vh]"
          >
            <GatsbyImage
              alt={myOptionsPage.eventCalendar.posterImage.altText}
              loading="eager"
              image={
                myOptionsPage.eventCalendar.posterImage.localFile
                  .childImageSharp.gatsbyImageData
              }
              className="object-cover w-full h-full "
            />
            <Header
              className={"w-full absolute left-0 top-1/2 -translate-y-1/2"}
            >
              <Heading
                className="font-normal text-center !text-white h4"
                id={DOM.eventsSplit.id}
                split={{
                  getter: DOM.eventsSplit.get,
                  fxn: splitEventText,
                }}
              >
                Event Calendar
              </Heading>
            </Header>
          </HubPane>
          <Box className="min-h-[40vh]">
            <EventsCalItems
              isLoading={isLoading}
              isError={isError}
              data={data}
            />
          </Box>
        </Box>
        <footer id={DOM.colophon.id} className="h-screen ">
          <Footer />
        </footer>
      </Box>
    </Box.Main>
  )
}

export const query = graphql`
  {
    wpPage(title: { eq: "Event Calendar" }) {
      slug
      id
      title
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
    # wpGfForm(databaseId: { eq: 6 }) {
    #   databaseId
    #   confirmations {
    #     message
    #     isDefault
    #     isActive
    #     id
    #     name
    #     type
    #     url
    #   }
    #   ...gravityFormFragment
    # }
  }
`
