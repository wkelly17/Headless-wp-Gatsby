// Searching

const id2 = new flexDocument({
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

const id4 = new flexDocument({
  document: {
    preset: "score",
    id: "id",
    index: [
      {
        field: "content",
        resolution: 2,
      },
      {
        field: "title",
        resolution: 9,
      },
    ],
  },
})
// Just pass the document array (or a single object) to the index:
// id4.add(store)

// works:
let res2 = id3.search("ab", { index: "content", suggest: true, limit: 10 })
let final = res2.map((index) => {
  return index.result.map((id) => {
    return store[id]
  })
})
