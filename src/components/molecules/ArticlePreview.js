import React from "react"
import { Box, Heading, Button } from "../atoms"
import { TransitionLink } from "gatsby-plugin-transition-link/components/TransitionLink"

export default function ArticlePreview({ post, className }) {
  let { link, title, date } = post
  return (
    <Box as="article" className="flex flex-col ">
      <Heading as="h3" className="pb-2 article__title h5">
        <TransitionLink to={link}>{title}</TransitionLink>
      </Heading>
      <TransitionLink to={link}>Learn More</TransitionLink>
      <footer className="article__footer h6">
        <time dateTime={date}> Post {date} ago </time>
      </footer>
    </Box>
  )
}
