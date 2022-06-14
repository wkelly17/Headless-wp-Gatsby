import React from "react"

export default function List({ children, as = "ul", className, ...restProps }) {
  const Component = as
  return (
    <Component className={className} {...restProps}>
      {children}
    </Component>
  )
}
