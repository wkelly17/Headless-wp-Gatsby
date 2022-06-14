import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import qf from "../utilities/gsapScope"

export function Home2EventsExit({ node, e, exit, entry }, needDur = false) {
  if (!node) return

  let hubScroller = qf(node, "#hub-scroller")
  let section = qf(node, "#hub-section-3")
  let sectionBorder = qf(node, "#hub-section-3-border")
  let img = section.querySelector("img")

  // let headerWidth = header.offsetWidth;
  // let headerHeight = header.offsetHeight;

  let sectionX = (section.offsetLeft - 100) * -1
  let sectionY = (section.offsetTop - window.pageYOffset) * -1

  let sectionPrev = section.previousElementSibling
  let sectionNext = section.nextElementSibling

  let tl = gsap.timeline({
    paused: true,
  })

  tl.to(hubScroller, {
    duration: 0.8,
    ease: "expo.out",
    x: sectionX,
  })

    .to(
      section,
      {
        duration: 0.8,
        ease: "expo.out",
        width: window.innerWidth - 100,
      },
      "<"
    )

    .to(
      img,
      {
        opacity: 0,
        duration: 0.8,
        ease: "none",
      },
      "<"
    )

    .to(sectionBorder, {
      opacity: 0,
      ease: "none",
      duration: 0.4,
    })

    .set([sectionPrev, sectionNext], {
      opacity: 0,
    })

    .to(section, {
      duration: 0.5,
      ease: "expo.out",
      height: "60vh",
    })

  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}
export function EventsFromHomeEntry({ node, e, exit, entry }, needDur = false) {
  const q = gsap.utils.selector(node)

  let tl = gsap.timeline({
    paused: true,
  })

  tl.from(node, {
    opacity: 0,
    duration: 0.5,
  })
  if (entry && entry.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}

export function Home2VenueExit({ node, e, exit, entry }, needDur = false) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })
  console.count("home2venue")

  let hubScroller = qf(node, "#hub-scroller")
  let section = hubScroller.querySelector("#hub-section-2")
  let sectionCol = section.querySelector("#hub-section-2-col")
  let sectionBorder = section.querySelector("#hub-section-2-border")
  let sectionIllo = section.querySelector("#hub-section-2-illo")
  let sectionPane = section.querySelector("#hub-section2-pane")
  let sectionLines = section.querySelector("#hub-section-2lines")

  let headerWidth = 100
  let headerHeight = 100

  let sectionX = (section.offsetLeft - headerWidth) * -1
  let sectionY = (section.offsetTop - window.pageYOffset) * -1
  let sectionPrev = section.previousElementSibling
  let sectionNext = section.nextElementSibling

  // ANIM HERE;
  tl.to(sectionPane, {
    duration: 0.5,
    ease: "expo.out",
    height: "100vh",
    zIndex: 10,
  })

    .to(
      sectionLines,
      {
        duration: 0.5,
        ease: "expo.out",
        y: "15vw",
      },
      "<"
    )

    .to(hubScroller, {
      duration: 0.8,
      ease: "expo.out",
      x: sectionX,
    })

    .to(
      section,
      {
        duration: 0.8,
        ease: "expo.out",
        width: window.innerWidth - headerWidth,
      },
      "<"
    )

    .to(sectionBorder, {
      duration: 0.5,
      ease: "none",
      opacity: 0,
    })

  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}
