import React from "react"
import { Box, Heading, Button } from "../atoms"
import { useStaticQuery, graphql, Link } from "gatsby"
import GravityForm from "../gravityForms/GravityForm"
import { NewsletterSuccessFxn } from "../../animations/interactions"
import { MarqueeAnimate } from "../../animations/interactions"

export default function Footer({ sideScroller }) {
  const data = useStaticQuery(queryString)
  const { wpGfForm } = data

  let confirmationMessage =
    wpGfForm.confirmations[0]?.message ||
    "Success. Thank you for your submission"
  let confirmationFunction = React.useCallback((hookFormReset) => {
    NewsletterSuccessFxn(hookFormReset, confirmationMessage, wpGfForm)
  }, [])

  React.useEffect(() => {
    MarqueeAnimate(sideScroller)
  }, [sideScroller])

  const { myOptionsPage: optionsPage } = data.allWp.nodes[0]
  const { footerFields, marquee, virtualTourLink } = optionsPage
  return (
    <Box id="colophon-inner" className="bg-white d:flex d:flex-col d:h-full">
      <Box className="flex colophon_form">
        <GravityForm
          form={wpGfForm}
          formClassName="hub-newsletter-form"
          footerClassName={
            "dmax:bottom-0 dmax:h-24 dmax:absolute dmax:right-0 dmax:w-24"
          }
          confirmationFunction={confirmationFunction}
        />
      </Box>
      <Box id="colophon__content" className=" shadow-borderTopBg d:h-full">
        <Box
          id="colophon__content__top"
          className="grid h-full grid-cols-20 d:grid-cols-18 d:h-1/2 col-span-full"
        >
          <Box
            id="colophon__content__top__section"
            className="grid py-12 grid-cols-20 d:grid-cols-12 col-span-full d:col-span-12 d:py-0 shadow-borderRightBg"
          >
            <Box className="items-center self-center col-start-3 col-span-16 d:col-span d:col-span-8 d:col-start-3">
              <Heading as="h2" className="pb-2 h3 ">
                {footerFields.headline}
              </Heading>
              <p className="mb-4">{footerFields.textarea}</p>
              <Button.Link to={footerFields.cta.url} type={"link"}>
                {footerFields.cta.title}
              </Button.Link>
            </Box>
          </Box>
          <Box className="grid py-12 grid-cols-20 d:grid-cols-6 col-span-full d:col-span-6 d:py-0 bg-tertiary d:shadow-borderTopBg">
            <Box className="relative self-center col-start-3 d:col-start-2 col-span-16 d:col-span-4">
              <address className="font-normal underline font-extended">
                <a
                  className="transition-colors duration-300 ease-in-out text-grayDarker"
                  href={virtualTourLink.url}
                >
                  <span>
                    {footerFields.address.streetName}
                    <span className="sticker items-center bg-grayDarker border border-white rounded-full text-white flex flex-column font-condensed text-[1.65rem] h-16 justify-center leading-[.9] outline outline-[.125em] outline- outline-grayDarker w-16 absolute top-0 left-full rotate-[-15deg] scale-75 -translate-y-1/2 not-italic">
                      <small className="block text-2xl mt-[-.35em] uppercase font-condensed">
                        Ste {footerFields.address.suite}
                      </small>
                    </span>
                  </span>
                  <br />
                  {footerFields.address.city}, {footerFields.address.state}{" "}
                  {footerFields.address.zip} <br />
                </a>
                <a
                  href={`tel:+${footerFields.phone.areaCode}-${footerFields.phone.prefix}-${footerFields.phone.lineNumber}`}
                >
                  {footerFields.phone.areaCode}-{footerFields.phone.prefix}-
                  {footerFields.phone.lineNumber}
                </a>
              </address>
              <a
                href="/privacy-policy"
                className="underline text-grayDarker font-extended"
              >
                Privacy Policy
              </a>
            </Box>
          </Box>
        </Box>
        <Box
          id="colophon__content__bottom"
          className="text-center text-white bg-grayDarker d:h-1/2 tp:h-[40vw] h-[80vw] block relative overflow-hidden"
        >
          <small
            id="colophon__content__bottom__copyright"
            className="absolute left-0 w-full bottom-8"
          >
            2022 Duling Hall
          </small>

          <a
            href="https://www.honeybook.com/widget/duling_hall_220197/cf_id/626b113aa262f91551c3eca3"
            className="!text-white marquee h1"
          >
            <small className="absolute left-0 inline-block w-full pb-12 -translate-y-1/2 marquee__item top-1/2">
              {marquee.text}
            </small>
          </a>
        </Box>
      </Box>
    </Box>
  )
}

const queryString = graphql`
  query {
    allWp {
      nodes {
        myOptionsPage {
          footerFields {
            address {
              city
              fieldGroupName
              state
              streetName
              zip
              suite
            }
            cta {
              target
              title
              url
            }
            phone {
              areaCode
              fieldGroupName
              lineNumber
              prefix
            }
            social {
              twitter {
                target
                title
                url
              }
              instagram {
                target
                title
                url
              }
              facebook {
                target
                title
                url
              }
            }
            headline
            textarea
          }
          marquee {
            fieldGroupName
            text
          }
          virtualTourLink {
            fieldGroupName
            url
          }
        }
      }
    }
    wpGfForm(databaseId: { eq: 1 }) {
      databaseId
      confirmations {
        message
        isDefault
        isActive
        id
        name
        type
        url
      }
      ...gravityFormFragment
    }
  }
`
