import React from "react"
import {
  If,
  List,
  ListItem,
  IconInstagram,
  IconTwitter,
  IconFacebook,
  Text,
} from "../atoms"
import { useStaticQuery, graphql } from "gatsby"

export default function SocialList() {
  const data = useStaticQuery(queryString)
  const { social } = data.allWp.nodes[0]?.myOptionsPage?.footerFields

  return (
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
  )
}

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

const queryString = graphql`
  {
    allWp {
      nodes {
        myOptionsPage {
          footerFields {
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
