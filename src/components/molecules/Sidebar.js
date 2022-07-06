import React from "react"
import { List, ListItem } from "../atoms"

import TransitionLink from "gatsby-plugin-transition-link"
import { getTransLinkProps } from "../../animations/transitionLinkProps"
import { AnimationContext } from "../../context/AnimationContext"

const Sidebar = ({ parent, ownChildren, siblings, nodeType }) => {
  // const data = useStaticQuery(queryString)
  let { transitionDurations } = React.useContext(AnimationContext)

  function highlightActiveTransitionLink(item) {
    return window.location.pathname === item.uri ? "text-grayDark" : ""
  }
  function determineAria(item) {
    return window.location.pathname === item.uri
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
            <TransitionLink
              to={item.uri}
              className={`text-grayDarker ${highlightActiveTransitionLink(
                item
              )} hover:text-primary focus:text-primary`}
              {...determineAria(item)}
              {...getTransLinkProps("genericTransLink", transitionDurations)}
            >
              {item.title}
            </TransitionLink>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Sidebar
