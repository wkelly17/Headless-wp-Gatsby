import React from "react"

export default function If({ data, component, fallback, debugKey, render }) {
  let hasValidFallback =
    React.isValidElement(fallback) || typeof fallback == "string"
  if (!data && hasValidFallback) {
    return <>{fallback}</>
  } else if (!data) {
    return ""
  } else if (data) {
    return <>{component}</>
  }
}
