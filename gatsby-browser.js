import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./src/css/global.css"
import "./src/css/style.scss"
import { ResponsiveProvider } from "./src/context/ResponsiveContext"
import { gsap } from "gsap"

const queryClient = new QueryClient()
gsap.config({
  nullTargetWarn: false,
})

export const wrapRootElement = ({ element }) => (
  <ResponsiveProvider>
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  </ResponsiveProvider>
)
