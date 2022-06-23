import React, { useEffect, useState } from "react"
import { useToggle } from "react-use"

export function useDomLoadedEffect(domLogicFxn, rerenderDeps) {
  const [afterRender, setAfterRender] = useState() // internal state
  let [isRendered, toggleIsRendered] = useToggle(false)

  // The way this works:
  // 1. useEffect 1 first fire (after Render == false)
  // 2. useEffect 2 fires (sets afterRender = true);
  // 3. Effects are complete, React updates dom
  // 4. Effect from step 2 triggers effect 1 with new state (e.g afterRender = true)
  // 5. EffectOne now has a renderedDom; You may puss in a function to perform any logic you wish with the rendered dom;  the renderedStatus along with toggle is available to domLogicFxn

  useEffect(() => {
    if (!afterRender) return
    domLogicFxn()
    // here DOM is loaded and you can query DOM elements
    // then reset
    setAfterRender(false)
  }, [afterRender])

  useEffect(() => {
    setAfterRender(true) // (1) will be called after DOM rendered
  }, [isRendered, ...rerenderDeps]) // or don't set any if you want to listen to all re-render events

  // return the Rendered status for conditional rendering along with the toggle
  return {
    isRendered,
    toggleIsRendered,
  }
}
