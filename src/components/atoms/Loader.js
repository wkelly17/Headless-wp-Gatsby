import React from "react"
import Box from "./Box"

export default function Loader({ ...restProps }) {
  return <Box className="loader" {...restProps} />
}
