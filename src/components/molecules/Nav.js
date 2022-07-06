import React from "react"
import { List, ListItem } from "../atoms"
import TransitionLink from "gatsby-plugin-transition-link"
// import { getTransLinkProps } from "../../animations/transitionLinkProps"

export default function Nav({ children, className }) {
  return <nav className={className}>{children}</nav>
}

Nav.Recursive = function RecursiveList({
  items,
  depth = 10,
  children,
  as = "nav",
  className,
  counter = 1,
  topLevelListItemClassNames = "",
  listItemClassNames = "",
  subNavClasses = "",
  exit,
  entry,
  onTransitionLinkClick,
  ...restProps
}) {
  const Component = as
  //start on firs pass; no recursion
  function recurseIn(item) {
    if (item.children.length) {
      counter++
      return (
        <Nav.Recursive
          items={item.children}
          counter={counter}
          depth={depth}
          className={subNavClasses}
          listItemClassNames={""}
          exit={exit}
          entry={entry}
          as={as}
          onTransitionLinkClick={onTransitionLinkClick}
          {...restProps}

          // className={""}
        />
      )
    }
  }
  let navPrefix = counter === 1 ? "nav" : `nav__subnav`

  function liClassName(item) {
    let base = `${navPrefix}__item ${navPrefix}__list__item`
    let withProps = `${listItemClassNames}`
    let hasChildren = `${
      !!item.children.length ? "nav__item__hasChildren" : ""
    }`

    return [base, withProps, hasChildren, topLevelListItemClassNames]
      .filter((bool) => bool)
      .join(" ")
  }

  console.log("TRANSITION PROPS!!!!!!!!")
  console.log({ exit, entry })

  return (
    <Component className={`${navPrefix} ${className ?? ""}`} {...restProps}>
      <List className={`${navPrefix}__list`}>
        {items.map((item, idx) => {
          return (
            <ListItem key={item.id} className={liClassName(item)}>
              <TransitionLink
                exit={exit}
                entry={entry}
                to={item.uri}
                onClick={onTransitionLinkClick}
                className={`${navPrefix}__list__item__link `}
              >
                <span>{item.label}</span>
              </TransitionLink>
              {counter < depth && recurseIn(item)}
            </ListItem>
          )
        })}
      </List>
    </Component>
  )
}
