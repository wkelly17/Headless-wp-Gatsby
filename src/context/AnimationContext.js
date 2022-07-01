import React, { createContext } from "react"
import {
  ExitFromNewsArchiveToSingle,
  initialPageAnimation,
  ExitToHomeFromMastheadLogo,
  Home2EventsExit,
  EventsFromHomeEntry,
  Home2VenueExit,
  toVenueEnter,
  Home2News,
  NewsFromHomeEnter,
  toNewsSingleLeave,
} from "../animations/pageTransitions"

const AnimationContext = createContext()

const AnimationProvider = ({ children }) => {
  const [transitionDurations, setTransitionDurations] = React.useState()

  // NOTE: TRANSITION LINK ALREADY RESPECTS PREFERS REDUCED MOTION MEDIA QUERY

  // const [isInitialLoad, setIsInitialLoad] = React.useState(true)

  React.useEffect(() => {
    let placeholderNode = document.querySelector(".pageWrapper") //doesn't matter; just need a valid node to give gsap to calculate durations of page exits;

    let durations = {
      newsArchiveToSingleExit: ExitFromNewsArchiveToSingle(
        { node: placeholderNode },
        true
      ),
      toHomeFromMasthead: ExitToHomeFromMastheadLogo(
        { node: placeholderNode },
        true
      ),
    }

    setTransitionDurations(durations)
    console.log({ transitionDurations })
    initialPageAnimation()
  }, [])

  return (
    <AnimationContext.Provider
      value={{
        transitionDurations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export { AnimationContext, AnimationProvider }
