import React from "react"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { cnMap } from "../../utilities/className"

const buttonClassNames = {
  base: "cursor-pointer inline-flex font-extended items-center text-[.6667rem] font-bold relative uppercase align-middle",
  pill: "btn-pill bg-primary border-none rounded-[3rem] py-0 pr-16 pl-6 relative duration-100 h-12 text-white before:content-[''] before:rounded-[50%] before:shadow-pillShadow before:h-12 before:absolute before:right-0 before:top-0 before:w-12 after:content-[''], after:h-4 after:my-0 after:-mr-12 after:ml-8 after:w-4 ",
  link: "btn-link text-grayDarker after:content-[''] after:h-[1em] after:mt-0 after:mr-0 after:mb-[-3px] after:ml-2 after:w-[1em]",
}

function Button({ children, className = "", type, ...restProps }) {
  return (
    <button
      {...restProps}
      className={`${buttonClassNames.base} ${className && className} ${
        type && cnMap(type, buttonClassNames)
      }`}
    >
      {children}
    </button>
  )
}
Button.Link = function ButtonLink({
  children,
  to,
  type,
  className = "",
  ...restProps
}) {
  return (
    <Link
      className={getButtonClassName(className, type)}
      to={to}
      {...restProps}
    >
      {children}
    </Link>
  )
}

Button.TransitionLink = function btl({
  children,
  to,
  type,
  className,
  ...restProps
}) {
  return (
    <TransitionLink
      to={to}
      className={getButtonClassName(className, type)}
      {...restProps}
    >
      {children}
    </TransitionLink>
  )
}

Button.LinkExternal = function ButtonLinkExternal({
  children,
  to,
  type,
  className,
  ...restProps
}) {
  return (
    <a className={getButtonClassName(className, type)} href={to} {...restProps}>
      {children}
    </a>
  )
}

function getButtonClassName(className, type = undefined) {
  return `${className || ""} ${buttonClassNames.base} ${
    type && cnMap(type, buttonClassNames)
  }`
}

export default Button
