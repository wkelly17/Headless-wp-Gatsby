import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./src/css/global.css"
const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
)
