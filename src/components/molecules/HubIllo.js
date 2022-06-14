import React from "react"
import { Box } from "../atoms"
import cn from "../../utilities/className"

export default function HubIllo({
  children,
  as = "div",
  classKeys,
  ref,
  className,
  ...restProps
}) {
  // let addlClasses = {
  //   sm: "pt-[20%] d:hidden",
  //   md: "h-2/5 dmax:w-1/2 dmax:h-[35vh]",
  //   half: "h-1/2 dmax:w-full dmax:h-[56.25%]",
  //   lg: "h-3/5 dmax:w-1/2 dmax:h-[35vh]",
  //   xl: "h-full dmax:w-full dmax:h-[50vh]",
  //   center: "flex align-center justify-center",
  //   noOverflow: "overflow-hidden",
  // }

  return (
    <Box
      {...restProps}
      ref={ref}
      as={as}
      className={`fill-current text-grayDarker ${className}`}
    >
      {children}
    </Box>
  )
}
