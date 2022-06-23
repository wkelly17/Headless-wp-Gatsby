import React from "react"
import { forwardRef } from "react"

const Text = forwardRef(({ children, as = "p", ...props }, ref) => {
  const Component = as

  return (
    <Component {...props} ref={ref}>
      {children}
    </Component>
  )
})

Text.Inline = forwardRef(({ children, as = "span", ...props }, ref) => {
  const Component = as
  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  )
})

export default Text
