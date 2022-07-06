import React from "react"
import { domToReact } from "html-react-parser"
import { DisclosureBlock } from "../components/customAcfBlocks"

export const replaceOptions = {
  replace: (domNode) => {
    //=============== ACCORDION START  =============
    if (domNode.attribs?.class?.includes("madg-customDisclosure")) {
      console.log("DISCLOSURE BLOCK")
      return (
        <DisclosureBlock>
          {domToReact(domNode.children, replaceOptions)}
        </DisclosureBlock>
      )
    } else if (domNode.attribs?.class?.includes("customDisclosureBtn")) {
      console.log("DISCLOSURE BTN")

      return (
        <DisclosureBlock.Button>
          {domToReact(domNode.children, replaceOptions)}
        </DisclosureBlock.Button>
      )
    } else if (
      domNode.attribs?.class?.includes("customBlock-disclosurePanel")
    ) {
      console.log("DISCLOSURE PANEL")
      return (
        <DisclosureBlock.Panel>
          {domToReact(domNode.children, replaceOptions)}
        </DisclosureBlock.Panel>
      )
    }
    //=============== ACCORDION END===========
    else if (domNode.attribs?.decoding && domNode.attribs?.["data-srcset"]) {
      // domNode.classList.add("!opacity-100")
      return domToReact(domNode.children, replaceOptions)
    }
  },
}
