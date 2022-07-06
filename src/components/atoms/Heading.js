import React from "react"
import { forwardRef } from "react"

const Heading = forwardRef(
  (
    {
      children = null,
      as = "h1",
      className,
      wrapInHeader,
      headerClasses,
      split,
      splitFxn,
      ...restProps
    },
    ref
  ) => {
    const Component = as

    React.useEffect(() => {
      if (!split) return
      let node = split.getter()
      if (node.firstChild?.classList?.contains("split__word")) {
        return
      }
      split.fxn(node)
    }, [split])

    if (wrapInHeader) {
      return (
        <header className={headerClasses}>
          <Component ref={ref} className={className} {...restProps}>
            {children}
          </Component>
        </header>
      )
    }
    return (
      <Component ref={ref} className={className} {...restProps}>
        {children}
      </Component>
    )
  }
)

// export default function Heading({
//   children,
//   as = "h1",
//   className,
//   wrapInHeader,
//   headerClasses,
//   split,
//   splitFxn,
//   ...restProps
// }) {
//   const Component = as

//   React.useEffect(() => {
//     if (!split || !splitFxn) return;
//     splitFxn()
//   }, [] )

//   if (wrapInHeader) {
//     return (
//       <header className={headerClasses}>
//         <Component className={className} {...restProps}>
//           {children}
//         </Component>
//       </header>
//     )
//   }
//   return (
//     <Component className={className} {...restProps}>
//       {children}
//     </Component>
//   )
// }

export default Heading
