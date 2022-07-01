import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, List, Heading, ListItem } from "../atoms"
import { Link } from "gatsby"

const Sidebar = ({ parent, ownChildren, siblings, nodeType }) => {
  const data = useStaticQuery(queryString)

  function highlightActiveLink(item) {
    return window.location.pathname == item.uri ? "text-grayDark" : ""
  }
  function determineAria(item) {
    return window.location.pathname == item.uri
      ? {
          ariaCurrent: "page",
        }
      : null
  }

  let items = parent ? siblings : ownChildren //e.g. if there is a valid parent, use the siblings of the page calling this;  Otherwise use that pages children;

  if (!items) return null //e..g no parent and no siblings = no sidebar;

  // From a page, I could just pass in the siblings as data if there is a parent, and pass any children it has if not;

  return (
    <List>
      {items.map((item, idx) => {
        return (
          <ListItem className="mb-2 last:mb-0 ">
            <Link
              to={item.uri}
              className={`text-grayDarker ${highlightActiveLink(
                item
              )} hover:text-primary focus:text-primary`}
              {...determineAria(item)}
            >
              {item.title}
            </Link>
          </ListItem>
        )
      })}
    </List>
  )
}

const queryString = graphql`
  {
    allWpContentNode(filter: { nodeType: { nin: ["MediaItem", "Example"] } }) {
      nodes {
        nodeType
        link
        ... on WpPage {
          id
          title
        }
        ... on WpPost {
          id
          title
        }
      }
    }
  }
`

export default Sidebar
