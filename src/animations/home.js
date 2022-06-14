import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(DrawSVGPlugin)

export function homeScroller(homeRefs, sideScroller) {
  let viewportWidth =
    window.innerWidth -
    (window.innerWidth - document.documentElement.clientWidth)
  let calcWidth = viewportWidth * 2

  sideScroller.current = gsap.timeline({
    scrollTrigger: {
      trigger: homeRefs.current.hub,
      start: "top top",
      end: "+=" + calcWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      id: "homeSideScroller",
    },
  })

  sideScroller.current.to(homeRefs.current.hubScroller, {
    x: -1 * calcWidth,
    ease: "none",
  })
  return sideScroller
}
