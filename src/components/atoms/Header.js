import React from "react"

export default function Header({ className, children, ...restProps }) {
  return (
    <header className={className} {...restProps}>
      {children}
    </header>
  )
}
