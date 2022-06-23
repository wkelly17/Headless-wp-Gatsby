import React from "react"
import { ListItem } from "./index"
import { baseCn } from "../../utilities/className"

//   list-style: none;
// margin: 0; padding-left: 0;

let baseClasses = "m-0 pl-0 list-none"
export default function List({
  children,
  as = "ul",
  className,
  overRideBaseStyles = false,
  ...restProps
}) {
  const Component = as

  return (
    <Component
      className={baseCn({ overRideBaseStyles, className, baseClasses })}
      {...restProps}
    >
      {children}
    </Component>
  )
}

List.Recursive = function RecursiveList({
  items,
  depth = 10,
  children,
  as = "ul",
  className,
  counter = 1,
  overRideBaseStyles,
  ...restProps
}) {
  const Component = as

  //start on firs pass; no recursion

  function recurseIn(item) {
    if (item.children.length) {
      counter++
      return (
        <List.Recursive items={item.children} counter={counter} depth={depth} />
      )
    }
  }

  return (
    <Component
      className={baseCn({ overRideBaseStyles, className, baseClasses })}
      {...restProps}
    >
      {items.map((item, idx) => {
        return (
          <ListItem key={item.id}>
            {item.label}
            {counter < depth && recurseIn(item)}
          </ListItem>
        )
      })}
    </Component>
  )
}
