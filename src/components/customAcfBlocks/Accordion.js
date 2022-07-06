import React from "react"
import { Disclosure } from "@headlessui/react"
import { Heading, IconChevronRight, Box } from "../atoms"
import { accordionHeight } from "../../animations/interactions"

export default function DisclosureBlock({ children }) {
  return (
    <Disclosure as="div" id="findme!!" className="overflow-hidden ">
      {children}
    </Disclosure>
  )
}
DisclosureBlock.Button = function disclosureBtn({ children }) {
  return (
    <Heading as="h3" className="h4">
      <Disclosure.Button className="flex justify-between w-full">
        {({ open }) => {
          return (
            <>
              {children}

              <IconChevronRight
                className={`inline-block text-primary transform duration-200 scale-50 stroke-current fill-current ${
                  open ? "transform rotate-90" : ""
                }`}
              />
            </>
          )
        }}
      </Disclosure.Button>
    </Heading>
  )
}

DisclosureBlock.Panel = function DisclosurePanel({ children }) {
  let [isOpen, setIsOpen] = React.useState(false)
  let panelRef = React.useRef()
  let timeline = React.useRef(null)

  let determineDur = React.useCallback(function determineDuration(height) {
    return height / 1500
  }, [])

  React.useEffect(() => {
    console.log(panelRef.current?.scrollHeight)
    if (!timeline.current) {
      let dur = determineDur(panelRef.current?.scrollHeight)

      timeline.current = accordionHeight(panelRef, dur)
    }
    if (timeline.current.isActive()) {
      timeline.current.reverse()
    } else if (isOpen) {
      timeline.current.play()
    } else {
      timeline.current.reverse()
    }
  }, [isOpen, determineDur])
  return (
    // <Transition
    //   enter="transition duration-300 ease-out"
    //   enterFrom="transform  h-0"
    //   enterTo="transform  h-full"
    //   leave="transition duration- ease-out"
    //   leaveFrom={`transform   h-[${height}]`}
    //   leaveTo="transform   h-0"
    //   className="overflow-hidden"
    // >
    <Disclosure.Panel className="bg-gray-100" id="panel" static>
      {({ open }) => {
        return (
          <>
            <Box
              ref={panelRef}
              className={`h-0 overflow-hidden`}
              {...setIsOpen(open)}
            >
              <Box className="p-8 pt-2">{children}</Box>
            </Box>
          </>
        )
      }}
    </Disclosure.Panel>
    // </Transition>
  )
}
