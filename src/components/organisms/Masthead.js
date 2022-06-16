import React from "react"
import { Box, Header, List, ListItem, Button } from "../atoms"
import { Nav } from "../molecules"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

// import { Menu } from "@headlessui/react"

export default function Masthead(props) {
  const data = useStaticQuery(queryString)
  const { wpMenu: flatMenu } = data
  const wpMenu = flatListToHierarchical(flatMenu.menuItems.nodes)

  // todo: skip links
  return (
    <Header
      id="masthead"
      className="masthead bg-grayLight left-0 fixed w-full d:w-[10%] h-full z-10"
      role="banner"
    >
      <Box className="relative z-50 flex w-full h-full bg-white d:shadow-borderRightBg d:flex-col d:items-start">
        <Link
          to="/"
          className="masthead__logo d:pt-[100%] d:w-full tl:pt-[10%] tl:w-[10%] tp:pt-[15%] tp:w-[15%] block pt-[20%] relative w-[20%] d:shadow-none shadow-borderRightSm "
        >
          <StaticImage
            alt="Duling Logo"
            src="../../images/logo.svg"
            className="absolute block w-1/2 h-auto m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 d:p-0"
          />
        </Link>
        <Button
          aria-expanded={false}
          id="toggle"
          className="w-full d:shadow-borderTopBg d:h-full"
        >
          <span className="duration-100 ease-linear origin-center rotate-90 d:block">
            Menu
          </span>
        </Button>
      </Box>
      {/* <Nav.Recursive items={wpMenu} depth={3} /> */}
    </Header>
  )
}

const flatListToHierarchical = (
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const tree = []
  const childrenOf = {}
  data.forEach((item) => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}

const queryString = graphql`
  {
    wpMenu(name: { eq: "Main Nav" }) {
      id
      name
      menuItems {
        nodes {
          id
          label
          title
          target
          uri
          parentId
        }
      }
    }
  }
`
