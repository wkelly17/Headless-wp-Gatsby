import React from "react"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import cn from "../../utilities/className"

const buttonClassNames = {
  base: "inline-flex font-extended items-center text-[.6667rem] font-bold relative uppercase align-middle",
  pill: "btn-pill bg-primary border-none rounded-[3rem] py-0 pr-16 pl-6 relative duration-100 h-12 text-white before:content-[''] before:rounded-[50%] before:shadow-pillShadow before:h-12 before:absolute before:right-0 before:top-0 before:w-12 after:content-[''], after:h-4 after:my-0 after:-mr-12 after:ml-8 after:w-4 ",
  link: "btn-link text-grayDarker after:content-[''] after:h-[1em] after:mt-0 after:mr-0 after:mb-[-3px] after:ml-2 after:w-[1em]",
}

function Button({ children, ...restProps }) {
  return (
    <button {...restProps} className={buttonClassNames.base}>
      {children}
    </button>
  )
}
Button.Link = function ButtonLink({
  children,
  to,
  type,
  className,
  ...restProps
}) {
  return (
    <Link
      className={`${className} ${buttonClassNames.base} ${
        type && getTypes(type)
      } `}
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
      className={`${className && className} ${buttonClassNames.base} ${
        type && getTypes(type)
      } `}
      {...restProps}
    >
      {children}
    </TransitionLink>
  )
}
function getTypes(type) {
  if (Array.isArray(type)) {
    let total = ""
    type.forEach((t) => {
      total += " " + buttonClassNames[t]
    })
    return total
  } else {
    return buttonClassNames[type]
  }
}

export default Button
