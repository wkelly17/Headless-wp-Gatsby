import { gsap } from "gsap"

export default function qf(node, selector) {
  const q = gsap.utils.selector(node)
  let item = q(selector)[0]
  return item
}
