import {
  ExitToHomeFromMastheadLogo,
  toHomeEnter,
  Home2EventsExit,
  EventsFromHomeEntry,
} from "./pageTransitions"

export function getTransLinkProps(key, transitionDurations) {
  if (!transitionDurations) return

  // let exit, trigger, length, play = true, delay
  if (key == "masthead") {
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
  } else if (key == "home2Events") {
    return {
      exit: {
        length: transitionDurations.toEvents,
        play: true,
      },
      entry: {
        delay: transitionDurations.toEvents,
        // appearAfter: transitionDurations.toEvents,
      },
      trigger: async function (pages) {
        // debugger
        const exit = await pages.exit
        const entry = await pages.entry

        debugger
        await entry.visible
        debugger
        let params = {
          node: exit.node,
          e: null,
          exit,
          entry,
        }
        Home2EventsExit(params)

        console.log(entry)
        // debugger
        return
      },
    }
  }
}
