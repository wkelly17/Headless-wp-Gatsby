import React, { createContext } from "react"
import { useMediaQuery } from "react-responsive"
import { useMedia } from "react-use"

const ResponsiveContext = createContext()

const ResponsiveProvider = ({ children }) => {
  const isDesktop = useMedia("(min-width: 1200px)")
  const isTouch = useMedia("(pointer:coarse)")
  const [fakerInstance, setFakerInstace] = React.useState(false)

  console.log({ isDesktop, isTouch })

  const Desktop = ({ children, handleChange }) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 }, undefined, handleChange)
    return isDesktop ? children : null
  }

  const TabletPortrait = ({ children, handleChange }) => {
    const isDesktop = useMediaQuery(
      { minWidth: 600, maxWidth: 899 },
      undefined,
      handleChange
    )
    return isDesktop ? children : null
  }
  const TabletLandscape = ({ children, handleChange }) => {
    const isTl = useMediaQuery(
      { minWidth: 900, maxWidth: 1224 },
      undefined,
      handleChange
    )

    return isTl && isTouch ? children : null
  }
  const DesktopLarge = ({ children, handleChange }) => {
    const isDesktop = useMediaQuery({ minWidth: 1600 }, undefined, handleChange)
    return isDesktop ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }

  return (
    <ResponsiveContext.Provider
      value={{
        Desktop,
        DesktopLarge,
        TabletPortrait,
        TabletLandscape,
        Mobile,
        Default,
        isDesktop,
        isTouch,
        fakerInstance,
        setFakerInstace,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  )
}

export { ResponsiveContext, ResponsiveProvider }
