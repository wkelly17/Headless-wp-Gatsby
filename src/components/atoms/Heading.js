import React from "react"

export default function Heading({
  children,
  as = "h1",
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
