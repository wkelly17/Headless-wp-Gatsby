import React from "react"

export default function Heading({
  children,
  as = "h1",
  className,
  wrapInHeader,
  headerClasses,
  ...restProps
}) {
  const Component = as

  if (wrapInHeader) {
    return (
      <header className={headerClasses}>
        <Component className={className} {...restProps}>
          {children}
        </Component>
      </header>
    )
  }
  return (
    <Component className={className} {...restProps}>
      {children}
    </Component>
  )
}
