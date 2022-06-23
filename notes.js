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

// HomePage
//       <p className="">Next thing</p>
//       {/* <Desktop
//         handleChange={(matches) => {
//           console.log("change from desktop", matches)
//         }}
//       > */}
//       {/* https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image#withartdirection */}
//       {/* <GatsbyImage
//           alt={hero.image.altText}
//           image={hero.image.localFile.childImageSharp.gatsbyImageData}
//         /> */}
//       {/* </Desktop> */}
//       <TransitionLink
//         to="/contact-us"
//         exit={{
//           trigger: ({ exit, node }) => interestingExitAnimation(exit, node),
//           length: 0.5,
//         }}
//         entry={{
//           trigger: ({ exit, node }) => interestingEnterAnimation(exit, node),
//           delay: 0.9,
//         }}
//       >
//         Go to page 2
//       </TransitionLink>
{
  /* {isFetching && <p>Loading</p>} */
}
{
  /* {<GravityForm data={wpGfForm} />} */
}

// ! THIS WILL GIVE YOU BOTH PAGES AT ONE IN A BARBA TYPE FASHION

{
  /* <TransitionLink
to="/event-calendar"
trigger={async (pages) => {
  // wait until we have access to both pages
  
  const exit = await pages.exit
  const entry = await pages.entry
  // here we can access both pages

  // You could measure the entry element here

  // start exit animation based on measurements if you want
  // wait for the entering page to become visible
  await entry.visible

  console.log(entry)
  let x = 3
  
  // the entering page is visible here.
  // if you want you can animate it now!
}}
className="col-span-full"
>
<GatsbyImage
  alt={myOptionsPage.eventCalendar.posterImage.altText}
  image={
    myOptionsPage.eventCalendar.posterImage.localFile
      .childImageSharp.gatsbyImageData
  }
  className="object-cover w-full h-full "
/>
<span
  id="hub-section-3-border"
  className="absolute block bg-grayDarker right-0 top-0 w-full d:w-[4px] d:h-full"
></span>
</TransitionLink> */
}
