import { gsap } from "gsap"

export function qf(node, selector) {
  const q = gsap.utils.selector(node)
  let item = q(selector)[0]
  return item
}
export function viewPortWidth() {
  return (
    window.innerWidth -
    (window.innerWidth - document.documentElement.clientWidth)
  )
}
export function FallbackNodeForDurIfNeeded(arr, fallback) {
  if (!arr.filter((i) => !!i).length) {
    arr.forEach((node) => {
      return (node = fallback)
    })
  }
}
export function querySafe(sel, isForDuration, scopedNode) {
  let node
  if (scopedNode) {
    if (!Object.keys(scopedNode).length) {
      return {}
    } else return scopedNode.querySelector(sel)
  } else {
    node = document.querySelector(sel) || {}
  }
  debugQueriesIfNeeded(sel, isForDuration)
  return node
}
export function querySafeAll(sel) {
  let node = document.querySelectorAll(sel) || {}
  return node
}

function debugQueriesIfNeeded(sel, isForDuration) {
  if (process.env.GATSBY_DEV) {
    if (!document.querySelector(sel) && !isForDuration) {
      console.warn(`query for ${sel} was unsuccessful @ ${console.trace()}`)
    }
  }
}
