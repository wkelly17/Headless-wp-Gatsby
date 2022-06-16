import React from "react"
import { ListItem } from "./index"

export default function List({ children, as = "ul", className, ...restProps }) {
  const Component = as
  return (
    <Component className={className} {...restProps}>
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
  ...restProps
}) {
  const Component = as
  debugger
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
    <Component className={className} {...restProps}>
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
