import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./src/css/global.css"
import { ResponsiveProvider } from "./src/context/ResponsiveContext"
const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => (
  <ResponsiveProvider>
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  </ResponsiveProvider>
)
