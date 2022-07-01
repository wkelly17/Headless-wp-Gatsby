import React, { useState, useRef } from "react"
import { Box, Header, Button, LinesRecords, If, IconCloseSvg } from "../atoms"
import { Nav } from "../molecules"
import { useStaticQuery, graphql } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { StaticImage } from "gatsby-plugin-image"
import { Dialog } from "@headlessui/react"
import { gsap } from "gsap"
import { useToggle } from "react-use"
import { LinesRecordsNav, mastHeadToggle } from "../../animations/interactions"
import { getTransLinkProps } from "../../animations/transitionLinkProps"
import { AnimationContext } from "../../context/AnimationContext"
import { useDomLoadedEffect } from "../../hooks/useDomLoadedEffect"

// import { Menu } from "@headlessui/react"

export default function Masthead(props) {
  // let [isOpen, setIsOpen] = useState(false);
  let { transitionDurations } = React.useContext(AnimationContext)

  let [isOpen, toggleIsOpen] = useToggle(false)
  let [dialogIsClosing, setDialogIsClosing] = useState(false)

  // Ref used here because need to maintain ongoing access to the timeline;
  let dialogRef = useRef({
    isOpen: false,
    node: null,
    timeline: gsap.timeline(),
  })
  let recordTl = useRef()
  // const spin = React.useCallback(() => {}, [] )
  const data = useStaticQuery(queryString)
  const { wpMenu: flatMenu } = data
  const wpMenu = flatListToHierarchical(flatMenu.menuItems.nodes)

  let { isRendered, toggleIsRendered } = useDomLoadedEffect(() => {
    if (isRendered) {
      let node = document.querySelector("#navLinesRecords .lines--record")
      recordTl.current = LinesRecordsNav(node)
      mastHeadToggle(
        dialogRef,
        recordTl,
        isOpen,
        toggleIsRendered,
        setDialogIsClosing
      )
    }
  }, [isOpen])

  function transLinkProps() {
    if (window.location.pathname !== "/") {
      let obj = getTransLinkProps("masthead", transitionDurations)
      return obj
    }
  }

  // todo: skip links
  return (
    <Box className="overflow-hidden ">
      <Header
        id="masthead"
        className="masthead bg-grayLight left-0 fixed w-full d:w-[10%] d:h-full z-10 border-b-2 border-grayDarker d:border-none"
        role="banner"
      >
        <Box className="relative z-50 flex w-full bg-white d:h-full d:shadow-borderRightBg d:flex-col d:items-start masthead__bar">
          <TransitionLink
            to="/"
            className="masthead__logo d:pt-[100%] d:w-full tl:pt-[10%] tl:w-[10%] tp:pt-[15%] tp:w-[15%] block pt-[20%] relative w-[20%] d:shadow-none shadow-borderRightSm"
            {...transLinkProps()}
          >
            <StaticImage
              alt="Duling Logo"
              src="../../images/logo.svg"
              loading="eager"
              className="absolute block w-1/2 h-auto m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 d:p-0"
            />
          </TransitionLink>
          <Button
            aria-expanded={false}
            id="navToggle"
            className="block w-full d:shadow-borderTopBg d:h-full masthead__toggle"
            onClick={(event) => {
              // leaving it rendered to gsap animate out;  Will toggle render inside anim;
              // debugger
              console.log("BUTTON CLICK")

              if (!isOpen && !dialogIsClosing) {
                toggleIsOpen()
                toggleIsRendered(true)
              }
            }}
          >
            <span className="inline-block !mx-auto duration-100 ease-linear origin-center d:rotate-90 d:block h4 masthead__toggle__text">
              {" "}
              Menu
            </span>
          </Button>
        </Box>
        <If
          data={isRendered}
          component={
            <Dialog
              static
              open={isOpen}
              onClose={(e) => {
                console.log("dialog close!")
                setDialogIsClosing(true)
                toggleIsOpen()
              }}
              id="drawer-outter"
              className="z-[1] top-0 fixed h-full w-full left:0  d:left-[10%] d:pt-0 d:w-[90%] -translate-x-full dmax:overflow-hidden "
              ref={(ref) => (dialogRef.current.node = ref)}
            >
              <Box id="drawer-inner" className="relative h-full ">
                <Box
                  id="drawer"
                  className="grid h-full text-white pt-[20%] d:p-0 grid-cols-20 d:grid-cols-18 bg-grayDarker"
                >
                  <Box className="self-center col-start-3 row-start-1 pt-12 pb-8 col-span-auto d:col-start-8 col-span-16 d:col-span-10 d:pt-0 d:pb-0">
                    <Nav.Recursive
                      items={wpMenu}
                      topLevelListItemClassNames="pb-8"
                      subNavClasses="mt-8"
                    />
                  </Box>
                  <Box
                    id="navLinesRecords"
                    className="col-span-full d:col-start-1 d:col-span-6 mastheadIllo d:ml-0   d:relative ml-[50%] row-start-2 d:row-start-1"
                  >
                    <LinesRecords className="right-0 d:-translate-y-1/2 d:absolute d:ml-0 top-1/2 !ml-[-560px] " />
                  </Box>
                  <Button
                    id="drawer-close"
                    tabIndex={0}
                    onClick={() => {
                      toggleIsOpen()
                      toggleIsRendered(true)
                    }}
                    className="text-transparent focus:text-primary focus:outline-primary  block d:pt-[10%] !absolute top-0 right-0 w-[10%]"
                  >
                    <span className="sr-only">Close Drawer</span>
                    <IconCloseSvg className="absolute transition-colors duration-300 ease-linear transform -translate-x-1/2 -translate-y-1/2 !fill-current text-inherit left-1/2 top-1/2" />
                  </Button>
                </Box>
              </Box>
            </Dialog>
          }
        />
      </Header>
    </Box>
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
