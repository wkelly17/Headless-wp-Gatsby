import React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Header,
  If,
  Text,
  IconFacebook,
  IconTwitter,
  IconInstagram,
} from "../components/atoms"
import { DOM } from "../constants/constants"
// import { Link } from "gatsby"

function ContactPage(props) {
  const { wpPage, allWp } = props.data
  const optionsPage = allWp.nodes[0]?.myOptionsPage
  const footerFields = optionsPage.footerFields
  const { address, phone, social } = footerFields
  const generalSettings = allWp.nodes[0]?.generalSettings

  return (
    <>
      <Box.Main id={DOM.contactPage.id} className="bg-tertiary">
        <Header
          className={
            "grid grid-cols-20 d:grid-cols-18 py-12 d:py-row2 dmax:text-center"
          }
        >
          <Box className="col-start-3 col-end-16 d:col-end-6">
            <Heading className="mb-[.5em] text-white text-shadow d:m-0 d:text-right leading-[.5]">
              Contact
            </Heading>
          </Box>
          <Box className="col-start-3 col-end-16 d:col-start-11 d:col-end-6">
            <Box>
              <address className="font-normal font-extended">
                <a
                  href="#"
                  target="_blank"
                  rel="nofollow"
                  className="underline text-grayDarker"
                >
                  {address.streetName && (
                    <>
                      <Text.Inline className="relative">
                        {address.streetName}
                        <Text.Inline className="sticker items-center bg-grayDarker border border-white rounded-full text-white flex flex-col font-condensed text-[1.65rem] h-16 justify-center leading-[.9] outline outline-[.125em] outline- outline-grayDarker w-16 absolute top-0 left-full rotate-[-15deg] scale-75 -translate-y-1/2 not-italic">
                          <small className="block text-2xl mt-[-.35em] uppercase font-condensed">
                            Ste
                          </small>
                          {address.suite}
                        </Text.Inline>
                      </Text.Inline>{" "}
                      <br />
                      {address.city}, {address.state} {address.zip} <br />
                    </>
                  )}
                </a>
                <If
                  data={Object.keys(phone).length}
                  component={
                    <a
                      href={`tel:${phone.areaCode}-${phone.prefix}-${phone.lineNumber}`}
                      className="underline text-grayDarker"
                    >
                      ({phone.areaCode}) {phone.prefix}-{phone.lineNumber}
                    </a>
                  }
                />
              </address>
            </Box>
            <Box>
              <If
                data={Object.keys(social).length}
                component={
                  <List className="pt-8">
                    {[
                      [social.instagram, IconInstagram],
                      [social.twitter, IconTwitter],
                      [social.facebook, IconFacebook],
                    ].map((channel) => {
                      return (
                        <SocialListItem
                          channel={channel[0]}
                          key={channel[0]?.title}
                          Icon={channel[1]}
                        />
                      )
                    })}
                  </List>
                }
              />
            </Box>
            <Box className="pt-12 d:pt-8">
              <Button.LinkExternal to="#" type="pill">
                Book and event
              </Button.LinkExternal>
            </Box>
          </Box>
        </Header>
        <Box className="grid grid-cols-20 d:grid-cols-18">
          <Box className="col-start-3 col-end-16 d:col-end-14">
            <If
              data={wpPage.contactFields?.personOfContact?.length}
              component={
                <List className="pb-2 text-center border-y pt-row border-grayDarker d:border-y-2 tp:flex tp:flex-wrap">
                  {wpPage.contactFields?.personOfContact.map((person, idx) => {
                    return person ? (
                      <ListItem
                        key={`${person.email}`}
                        className={`pb-8 tl:pb-row tp:w-[28.5%] tl:relative ${
                          (idx + 1) % 3 !== 0 &&
                          'mr-[7.14%] after:content-[""] after:h-1/2 after:left-[112.5%] after:ml[-1px] after:absolute after:top-0 after:w-[2px] after:bg-grayDarker'
                        }`}
                      >
                        <Text.Inline as="strong">{person.name}</Text.Inline>
                        <br />
                        {person.title}
                        <a href={`mailto:${person.email}`}> {person.email}</a>
                      </ListItem>
                    ) : null
                  })}
                </List>
              }
            />
            <Box className="text-center uppercase py-row font-extended">
              &copy; {new Date().getFullYear()}
              {" ".concat(generalSettings.title)}
            </Box>
          </Box>
        </Box>
      </Box.Main>
    </>
  )
}

export const query = graphql`
  {
    wpPage(slug: { eq: "contact" }) {
      slug
      id
      title
      contactFields {
        personOfContact {
          email
          fieldGroupName
          name
          title
        }
      }
    }
    allWp {
      nodes {
        generalSettings {
          dateFormat
          title
          description
        }
        myOptionsPage {
          footerFields {
            address {
              city
              fieldGroupName
              state
              streetName
              suite
              zip
            }
            phone {
              areaCode
              fieldGroupName
              lineNumber
              prefix
            }
            social {
              facebook {
                target
                title
                url
              }
              instagram {
                target
                title
                url
              }
              twitter {
                target
                title
                url
              }
            }
          }
        }
      }
    }
  }
`

function SocialListItem({ channel, Icon }) {
  if (!channel) return null
  return (
    <ListItem className="inline-block mr-6 last-of-type:mr-0 ">
      <a
        href={channel.url}
        target={channel.target}
        className="relative inline-flex text-center align-middle"
      >
        <Text.Inline className="sr-only">{channel.title}</Text.Inline>
        <Icon className="w-full text-grayDarker" />
      </a>
    </ListItem>
  )
}

export default ContactPage
