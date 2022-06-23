import React from "react"
import { Box, Heading, Button } from "../atoms"
import TransitionLink from "gatsby-plugin-transition-link"
import {
  toNewsSingleLeave,
  toNewsSingleEnter,
  ExitFromNewsArchiveToSingle,
  FromNewsArchiveSingleEnter,
} from "../../animations/pageTransitions"

export default function ArticlePreview({
  post,
  className,
  isHomePage,
  transitionDurations,
}) {
  let { uri, title, date } = post

  const transLinkProps = getPageTransitionProp(isHomePage, transitionDurations)

  return (
    <Box as="article" className="flex flex-col ">
      <Heading as="h3" className="pb-2 article__title h5">
        <TransitionLink to={uri} className="text-black" {...transLinkProps}>
          {title}
        </TransitionLink>
      </Heading>
      <Button.TransitionLink
        to={uri}
        className="order-3 text-black"
        type="link"
        {...transLinkProps}
      >
        Learn More
      </Button.TransitionLink>

      <footer className="order-2 article__footer h6">
        <time dateTime={date} className="inline-block mb-2">
          {" "}
          Post {date} ago{" "}
        </time>
      </footer>
    </Box>
  )
}

function getPageTransitionProp(isHomepage, transitionDurations) {
  if (isHomepage) {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          toNewsSingleLeave({ node, e, exit, entry }),
        length: transitionDurations?.toNewsSingle,
        play: true,
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          toNewsSingleEnter({ node, e, exit, entry }),
        delay: transitionDurations?.toNewsSingle,
        play: true,
      },
    }
  } else {
    // NEWS INDEX
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          ExitFromNewsArchiveToSingle({ node, e, exit, entry }),
        length: transitionDurations?.newsArchiveToSingleExit,
        play: true,
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          FromNewsArchiveSingleEnter({ node, e, exit, entry }),
        delay: transitionDurations?.newsArchiveToSingleExit,
        play: true,
      },
    }
  }
}
