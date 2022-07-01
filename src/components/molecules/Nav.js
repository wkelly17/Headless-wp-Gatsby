import React from "react"
import { List, ListItem } from "../atoms"
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
  topLevelListItemClassNames = "",
  listItemClassNames = "",
  subNavClasses = "",
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
          // className={""}
          listItemClassNames={""}
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

  return (
    <Component className={`${navPrefix} ${className ?? ""}`} {...restProps}>
      <List className={`${navPrefix}__list`}>
        {items.map((item, idx) => {
          return (
            <ListItem key={item.id} className={liClassName(item)}>
              <Link to={item.uri} className={`${navPrefix}__list__item__link `}>
                <span>{item.label}</span>
              </Link>
              {counter < depth && recurseIn(item)}
            </ListItem>
          )
        })}
      </List>
    </Component>
  )
}
