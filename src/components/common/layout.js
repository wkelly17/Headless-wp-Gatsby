import * as React from "react"
import { Search } from "../organisms"
import { useKey } from "react-use"
// import { Script } from "gatsby"
import fakerInstance from "../../constants/faker"
import { ResponsiveContext } from "../../context/ResponsiveContext"

export default function Layout({ element }) {
  // PROVIDE FAKER TO APP IN DEV
  let { setFakerInstace } = React.useContext(ResponsiveContext)
  fakerInstance.getFaker().then((faker) => {
    setFakerInstace(faker)
  })

  // SEARCH STATE
  let [openSearchDialog, setOpenSearchDialog] = React.useState(false)
  useKey("k", (event) => {
    if (event.metaKey) {
      console.log("you pressed command K!")
      setOpenSearchDialog(true)
    }
  })

  return (
    <>
      {element}
      <Search
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
      />
    </>
  )
}
