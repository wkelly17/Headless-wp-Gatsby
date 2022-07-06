import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { If, Text } from "../atoms"

export default function ContactInfo(props) {
  const data = useStaticQuery(queryString)
  const { address, phone } = data.allWp.nodes[0]?.myOptionsPage?.footerFields
  if (!address) return null
  return (
    <address className="font-normal font-extended">
      <a
        href="#"
        target="_blank"
        rel="nofollow"
        className="underline text-grayDarker"
      >
        {address.streetName && (
          <>
            <Text.Inline className="relative">
              {address.streetName}
              <Text.Inline className="sticker items-center bg-grayDarker border border-white rounded-full text-white flex flex-col font-condensed text-[1.65rem] h-16 justify-center leading-[.9] outline outline-[.125em] outline- outline-grayDarker w-16 absolute top-0 left-full rotate-[-15deg] scale-75 -translate-y-1/2 not-italic">
                <small className="block text-2xl mt-[-.35em] uppercase font-condensed">
                  Ste
                </small>
                {address.suite}
              </Text.Inline>
            </Text.Inline>{" "}
            <br />
            {address.city}, {address.state} {address.zip} <br />
          </>
        )}
      </a>
      <If
        data={Object.keys(phone).length}
        component={
          <a
            href={`tel:${phone.areaCode}-${phone.prefix}-${phone.lineNumber}`}
            className="underline text-grayDarker"
          >
            ({phone.areaCode}) {phone.prefix}-{phone.lineNumber}
          </a>
        }
      />
    </address>
  )
}

const queryString = graphql`
  {
    allWp {
      nodes {
        myOptionsPage {
          footerFields {
            address {
              city
              state
              streetName
              suite
              zip
            }
            phone {
              areaCode
              lineNumber
              prefix
            }
          }
        }
      }
    }
  }
`
