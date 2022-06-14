import React from "react"

export default function Heading({
  children,
  as = "h1",
  className,
  wrapInHeading,
  headerClasses,
  ...restProps
}) {
  const Component = as

  if (wrapInHeading) {
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
