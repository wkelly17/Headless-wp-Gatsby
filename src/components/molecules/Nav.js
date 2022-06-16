import React from "react"
import { Box, List, ListItem } from "../atoms"
import { Link } from "gatsby"

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
  listItemClassNames,
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
          // className={""}
          listItemClassNames={""}
        />
      )
    }
  }
  let navPrefix =
    counter === 1 ? "nav" : `nav__subnav nav__subnav-depth-${counter}`

  return (
    <Component className={`${className ?? ""} ${navPrefix}`} {...restProps}>
      <List className={`${navPrefix}__nav__list`}>
        {items.map((item, idx) => {
          return (
            <ListItem
              key={item.id}
              className={`${navPrefix}__item ${navPrefix}__list__item ${
                listItemClassNames ?? ""
              } ${!!item.children.length ? "nav__item__hasChildren" : ""}`}
            >
              <Link to={item.uri} className={`${navPrefix}__list__item__link `}>
                {item.label}
              </Link>
              {counter < depth && recurseIn(item)}
            </ListItem>
          )
        })}
      </List>
    </Component>
  )
}
