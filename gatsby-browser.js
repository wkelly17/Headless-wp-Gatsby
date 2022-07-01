import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"
import "./src/css/global.css"
import "./src/css/style.scss"
import { ResponsiveProvider } from "./src/context/ResponsiveContext"
import { AnimationProvider } from "./src/context/AnimationContext"
import { gsap } from "gsap"
import { Box } from "./src/components/atoms"
import { Masthead } from "./src/components/organisms"
import { Layout } from "./src/components/common"

const queryClient = new QueryClient()
gsap.config({
  nullTargetWarn: false,
})

export const wrapRootElement = ({ element }) => (
  <ResponsiveProvider>
    <AnimationProvider>
      <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
    </AnimationProvider>
  </ResponsiveProvider>
)
export const wrapPageElement = ({ element, props }) => {
  // todo: remove before prod
  function debugCn(inner) {
    if (inner) {
      return "debugDev404Innner"
    }
    if (window.location.pathname.includes("asd")) {
      return "debugDev404"
    }
  }

  return (
    <Box className={`${debugCn()} pageWrapper `}>
      <Masthead />
      <Box
        className={`${debugCn(true)} ${
          props.path !== "/" && "pageWrapperInner-notHome"
        }`}
      >
        <Layout element={element} />
      </Box>
    </Box>
  )
}
