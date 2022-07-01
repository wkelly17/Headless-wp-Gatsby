import React from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { Heading, IconChevronRight } from "../atoms"

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

DisclosureBlock.Panel = function disclosurePanel({ children }) {
  return (
    <Transition
      enter="transition duration-300 ease-out"
      enterFrom="transform  h-0"
      enterTo="transform  h-full"
      leave="transition duration-200 ease-out"
      leaveFrom="transform   h-full"
      leaveTo="transform   h-0"
      className="overflow-hidden"
    >
      <Disclosure.Panel className="overflow-hidden border border-grayDark">
        {children}
      </Disclosure.Panel>
    </Transition>
  )
}
