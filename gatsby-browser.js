import React from "react"
import { Link } from "gatsby"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./src/css/global.css"
import "./src/css/style.scss"
import { ResponsiveProvider } from "./src/context/ResponsiveContext"
import { gsap } from "gsap"
import { Box } from "./src/components/atoms"

const queryClient = new QueryClient()
gsap.config({
  nullTargetWarn: false,
})

export const wrapRootElement = ({ element }) => (
  <ResponsiveProvider>
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  </ResponsiveProvider>
)
export const wrapPageElement = ({ element, props }) => {
  return (
    <Box className="">
      <Box className="masthead">
        <Link to="/">home</Link>
      </Box>
      {element}
    </Box>
  )
}
