import React from "react"

export default function ListItem({
  children,
  as = "li",
  className,
  ...restProps
}) {
  const Component = as
  return (
    <Component className={className} {...restProps}>
      {children}
    </Component>
  )
}
