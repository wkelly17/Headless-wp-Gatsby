import * as React from "react"
import { graphql } from "gatsby"
import { useGetPosts, useLogin, useGravityForm } from "../api/queries"
import GravityForm from "../components/gravityForms/GravityForm"
// import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"
import lunr from "lunr"
import { useLunr } from "react-lunr"
import { Document as flexDocument } from "flexsearch"
import { useFlexSearch } from "react-use-flexsearch"

export default function Homepage(props) {
  const { homepage, wpGfForm, allLocalSearchWpSearch } = props.data

  let { index, store } = allLocalSearchWpSearch.nodes[0]
  // let parsed = JSON.parse(index)
  // console.log(lunr.Index.load(parsed))
  // let idx = lunr().Index.load(JSON.parse(index))

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

  // const results2 = useFlexSearch("about", id2, store)
  // let rawResults = index.search("about", {})
  // let all = rawResults.map(function (id) {
  //   return store[id]
  // })

  // const { status, data, error, isFetching } = useGravityForm(2)
  // console.log(wpGfForm)

  // if (error) return <h1>Something went wrong!</h1>
  // if (isLoading) return <h1>Loading...</h1>
  // console.log(data ?? "no data")

  // ! MUTATION WORKS; uses basic auth;  Would need to configure GQTY;

  // console.log("query!!")
  // console.log({ query })
  // console.log({ mutation })
  // console.log({ mutation })

  const interestingExitAnimation = (exit, node) => {
    // do some animation here
    gsap.to(node, {
      opacity: 0,
      duration: 0.5,
    })
  }
  const interestingEnterAnimation = (exit, node) => {
    // do some animation here
    let nestedEl = node.querySelector(".bg-green-400")
    gsap.from(node, {
      opacity: 0,
      duration: 0.5,
    })
    gsap.to(nestedEl, {
      background: "orange",
      delay: 0.2,
    })
  }

  return (
    <div>
      HomePage
      <p>Next thing</p>
      <TransitionLink
        to="/contact-us"
        exit={{
          trigger: ({ exit, node }) => interestingExitAnimation(exit, node),
          length: 0.5,
        }}
        entry={{
          trigger: ({ exit, node }) => interestingEnterAnimation(exit, node),
          delay: 0.9,
        }}
      >
        Go to page 2
      </TransitionLink>
      {/* {isFetching && <p>Loading</p>} */}
      {<GravityForm data={wpGfForm} />}
    </div>
  )
}

export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
      }
    }
    wpGfForm(databaseId: { eq: 1 }) {
      description
      isActive
      databaseId
      title
      ...gravityFormFragment
    }
    allLocalSearchWpSearch {
      nodes {
        index
        store
      }
    }
  }
`
