import React from "react"
export default function If({ data, children, fallback }) {
  let hasValidFallback =
    React.isValidElement(fallback) || typeof fallback == "string"
  if (!data && hasValidFallback) {
    return <>{fallback}</>
  } else if (!data) {
    return null
  } else if (data) {
    return <>{children}</>
  }
}
