import {
  ExitToHomeFromMastheadLogo,
  toHomeEnter,
  Home2EventsExit,
  Home2VenueExit,
  toVenueEnter,
  EventsFromHomeEntry,
  Home2News,
  NewsFromHomeEnter,
  toNavLeave,
  toNavEnter,
  genericLeave,
  genericEnter,
} from "./pageTransitions"

export function getTransLinkProps(
  key,
  transitionDurations,
  { toggleIsOpen: closeNavStateSetter } = {}
) {
  if (!transitionDurations) return

  // let exit, trigger, length, play = true, delay
  if (key === "masthead") {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) => {
          ExitToHomeFromMastheadLogo({ node, e, exit, entry })
        },
        length: transitionDurations.toHomeFromMasthead,
        play: true,
      },
      entry: {
        trigger: ({ node, e, exit, entry }) => {
          toHomeEnter({ node, e, exit, entry })
        },
        delay: transitionDurations.toHomeFromMasthead,
        state: { hideInitial: true },
        play: true,
      },
    }
  } else if (key === "home2Events") {
    return {
      exit: {
        length: transitionDurations.toEvents,
        trigger: ({ node, e, exit, entry }) => {
          Home2EventsExit({ node, e, exit, entry })
        },
        play: true,
      },
      entry: {
        trigger: ({ node, e, exit, entry }) => {
          EventsFromHomeEntry({ node, e, exit, entry })
        },
        play: true,
        delay: transitionDurations.toEvents,
        // appearAfter: transitionDurations.toEvents,
      },
      // trigger: async function (pages) {
      //   // debugger
      //   const exit = await pages.exit
      //   const entry = await pages.entry

      //   debugger
      //   await entry.visible
      //   debugger
      //   let params = {
      //     node: exit.node,
      //     e: null,
      //     exit,
      //     entry,
      //   }
      //   Home2EventsExit(params)

      //   console.log(entry)
      //   // debugger
      //   return
      // },
    }
  } else if (key === "home2Venue") {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          Home2VenueExit({ node, e, exit, entry }),
        length: transitionDurations?.toVenue,
        play: true,
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          toVenueEnter({ node, e, exit, entry }),
        delay: transitionDurations?.toVenue - 0.1,
        play: true,
      },
    }
  } else if (key === "home2Events") {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          Home2EventsExit({ node, e, exit, entry }),
        length: transitionDurations?.toEvents,
        play: true,
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          EventsFromHomeEntry({ node, e, exit, entry }),
        delay: transitionDurations?.toEvents,
        length: 1,
        play: true,
      },
    }
  } else if (key === "home2News") {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          Home2News({ node, e, exit, entry }),
        length: transitionDurations?.toNews,
        play: true,
        state: {
          transLink: true,
        },
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          NewsFromHomeEnter({ node, e, exit, entry }),
        delay: transitionDurations?.toNews - 0.1,
        play: true,
      },
    }
  } else if (key === "mastheadNavLink") {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          toNavLeave({ node, e, exit, entry, closeNavStateSetter }),
        length: transitionDurations?.leaveFromNav,
        play: true,
        state: {
          transLink: true,
        },
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          toNavEnter({ node, e, exit, entry }),
        delay: transitionDurations?.leaveFromNav - 0.1,
        play: true,
      },
    }
  } else if (key === "genericTransLink") {
    return {
      exit: {
        trigger: ({ node, e, exit, entry }) =>
          genericLeave({ node, e, exit, entry }),
        length: transitionDurations?.genericLeave,
        play: true,
        state: {
          transLink: true,
        },
      },
      entry: {
        trigger: ({ node, e, exit, entry }) =>
          genericEnter({ node, e, exit, entry }),
        delay: transitionDurations?.genericLeave - 0.1,
        play: true,
      },
    }
  }
}
