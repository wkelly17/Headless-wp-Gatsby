import React from "react"
import { forwardRef } from "react"

const Box = forwardRef(({ children = null, as = "div", ...props }, ref) => {
  const Component = as

  return (
    <Component {...props} ref={ref}>
      {children}
    </Component>
  )
})

Box.Section = forwardRef(({ children, ...props }, ref) => {
  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  )
})
Box.Main = forwardRef(({ children, ...props }, ref) => {
  return (
    <main ref={ref} {...props}>
      {children}
    </main>
  )
})

Box.Aside = forwardRef(({ children, ...props }, ref) => {
  return (
    <aside ref={ref} {...props}>
      {children}
    </aside>
  )
})

Box.Nav = forwardRef(({ children, ...props }, ref) => {
  return (
    <nav ref={ref} {...props}>
      {children}
    </nav>
  )
})
Box.Article = forwardRef(({ children, ...props }, ref) => {
  return (
    <article ref={ref} {...props}>
      {children}
    </article>
  )
})
Box.Footer = forwardRef(({ children, ...props }, ref) => {
  return (
    <footer ref={ref} {...props}>
      {children}
    </footer>
  )
})
export default Box
