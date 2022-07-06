import React, { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Document as flexDocument } from "flexsearch"
import { encode as advancedEncode } from "flexsearch/dist/module/lang/latin/advanced.js"
import { graphql, useStaticQuery, Link } from "gatsby"
import { useDebounce } from "react-use"

export default function Search({ openSearchDialog, setOpenSearchDialog }) {
  const data = useStaticQuery(queryString)
  const [searchTerm, setSearchTerm] = useState("")
  const [state, setState] = useState("")
  const [searchIndex, setSearchIndex] = useState(null)
  const [publicStore, setPublicStore] = useState(null)
  let [results, setResults] = React.useState(null)

  // first (skipped) is fxn returning current debounce state;
  const [, cancel] = useDebounce(
    () => {
      setState("Typing stopped")
      if (!searchIndex) return
      let results = searchIndex.search(searchTerm, {
        index: ["title", "content"],
        suggest: true,
        limit: 10,
      })
      let final = results
        .map((index) => {
          return index.result.map((id) => {
            return publicStore[id]
          })
        })
        .flat()
      let dedupedAndFlattened = [...new Set(final)]
      setResults(dedupedAndFlattened)
    },
    200,
    [searchTerm]
  )

  const getSearchData = React.useCallback(() => {
    if (searchIndex && publicStore) return
    async function getSearchItems() {
      // let publicIndex = data.
      const { publicIndexURL, publicStoreURL } =
        data.allLocalSearchWpSearch?.nodes[0]
      let response = await fetch(publicIndexURL)
      let publicStoreResponse = await fetch(publicStoreURL)
      let searchData = await response.json()
      let publicStoreData = await publicStoreResponse.json()
      console.log(searchData)
      console.log(publicStoreData)

      const searchIdx = flexDocument({
        id: "id",
        preset: "score",
        tokenize: "forward",
        cache: 100,
        charset: "latin:extra",
        encode: advancedEncode,
        document: {
          id: "id",
          index: [
            {
              field: "title",
              resolution: 9,
            },
            {
              field: "content",
              resolution: 9,
            },
          ],
        },
      })
      Object.entries(publicStoreData).forEach((kv, i) => {
        let [key, value] = kv
        searchIdx.add({ id: key, ...value })
      })

      setSearchIndex(searchIdx)
      setPublicStore(publicStoreData)
    }
    getSearchItems()
  }, [data.allLocalSearchWpSearch?.nodes, publicStore, searchIndex])

  return (
    <Transition show={openSearchDialog}>
      <Dialog
        onClose={() => setOpenSearchDialog(false)}
        className="relative z-40"
        id="findme"
        open={openSearchDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 "
          enterTo="opacity-100 "
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 overflow-y-auto bg-black/60"
            aria-hidden={true}
          >
            <div className="fixed inset-0 flex items-center justify-center p-12">
              <Dialog.Panel className="relative w-full h-full p-16 mx-auto bg-white rounded ">
                <Dialog.Title as={"p"} className="text-center">
                  You pushed Command K!
                </Dialog.Title>
                <label>
                  focusable element
                  <div>{state}</div>
                  <input
                    type="text"
                    value={searchTerm}
                    placeholder="Debounced input"
                    className="border-2 border-primary"
                    onChange={({ currentTarget }) => {
                      setState("Waiting for typing to stop...")
                      setSearchTerm(currentTarget.value)
                    }}
                    onFocus={(params) => {
                      getSearchData()
                    }}
                  />
                </label>

                <div className="z-10 w-4/5 mx-auto my-8 overflow-scroll bg-gray-200 h-4/5 ">
                  {results &&
                    results.map((item, idx) => {
                      if (item.nodeType === "MediaItem") {
                        return <p key={item.title}>Skipping media</p>
                      } else {
                        return (
                          <div key={item.title}>
                            <p>
                              Result - {item.title} - of Type {item.nodeType}
                            </p>
                            <Link to={item.link}>Link to it here</Link>
                          </div>
                        )
                      }
                    })}
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

const queryString = graphql`
  {
    allLocalSearchWpSearch {
      nodes {
        publicIndexURL
        publicStoreURL
        index
        store
      }
    }
  }
`
