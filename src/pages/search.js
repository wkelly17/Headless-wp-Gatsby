import React from "react"
import { Document as flexDocument } from "flexsearch"
import { useFlexSearch } from "react-use-flexsearch"
import { graphql } from "gatsby"

function SearchPage(props) {
  const { data } = props
  const [searchTerm, setSearchTerm] = React.useState("jurado")
  const { index, store } = data.allLocalSearchWpSearch.nodes[0]

  React.useEffect(() => {}, [])

  const id3 = React.useMemo(() => {
    let idx = new flexDocument({
      document: {
        id: "id",
        index: [
          {
            field: "title",
            resolution: 9,
          },
          {
            field: "content",
            resolution: 2,
          },
        ],
      },
    })
    Object.entries(store).forEach((kv, i) => {
      let [key, value] = kv
      idx.add({ id: key, ...value })
    })
    return idx
  }, [index, store])

  let res2 = id3.search("ab", { index: "content", suggest: true, limit: 10 })
  let final = res2.map((index) => {
    return index.result.map((id) => {
      return store[id]
    })
  })

  return (
    <div className="w-3/5 mx-auto ">
      <h1>Search page:</h1>
      {final}
    </div>
  )
}

export const query = graphql`
  {
    allLocalSearchWpSearch {
      nodes {
        index
        store
      }
    }
  }
`

export default SearchPage
