import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

import { querySafe, viewPortWidth } from "../utilities/gsap"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(DrawSVGPlugin)

export function NewsletterSuccessFxn(
  hookFormReset,
  confirmationMessage,
  wpGfForm
) {
  let form = document.querySelector(`#gform-${wpGfForm.databaseId}`)
  let input = form.querySelector('input[type="email"]')
  input.value = confirmationMessage
  gsap.to(input)
  setTimeout(() => {
    input.value = ""
    hookFormReset()
  }, 1500)
}
export function illoSputnikAnimate(ref, isDesktop, sideScroller) {
  if (isDesktop) {
    gsap.to(ref.current, {
      rotate: 180,
      scrollTrigger: {
        containerAnimation: sideScroller,
        trigger: "#hub-section-2",
        start: "right-=10% right-=10%",
        end: "right 10%",
        scrub: 1,
        toggleActions: "play pause resume pause",
      },
    })
  } else {
    gsap.to(ref.current, {
      rotate: 180,
      scrollTrigger: {
        containerAnimation: sideScroller,
        trigger: "#hub-section-2",
        start: "right-=10% right-=10%",
        end: "right 10%",
        scrub: 1,
        toggleActions: "play pause resume pause",
      },
    })
  }
}

export function linesRecord(ref, isDesktop, sideScroller) {
  // console.log({ ref })
  if (isDesktop) {
    gsap.to(ref, {
      rotate: 360,
      scrollTrigger: {
        containerAnimation: sideScroller,
        trigger: "#hub-section-5",
        start: "left right",
        end: "right 10%",
        scrub: 1,
        toggleActions: "play pause resume pause",
      },
    })
  } else {
    gsap.to(ref, {
      rotate: 360,
      scrollTrigger: {
        trigger: "#hub-section-5",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        toggleActions: "play pause resume pause",
      },
    })
  }
}

export function LinesRecordsNav(node) {
  if (!node) return
  let spin = gsap
    .timeline({
      paused: true,
    })
    .to(node, {
      rotate: 360,
      ease: "none",
      repeat: -1,
      duration: 3,
    })
  return spin
}

export function MarqueeAnimate(sideScroller) {
  let item = document.querySelector(".marquee__item")
  let fromX = item.parentElement.offsetWidth

  let tlMarquee = gsap.timeline({
    scrollTrigger: {
      containerAnimation: sideScroller,
      trigger: ".colophon__inner",
      start: "left right",
      end: "left right",
      toggleActions: "play none none reset",
    },
  })
  tlMarquee.fromTo(
    item,
    {
      x: fromX,
    },
    {
      x: "-100%",
      duration: 10,
      ease: "none",
      repeat: -1,
    }
  )
}

export function VenueHeroSt() {
  let target = document.querySelector("#venue-hero")
  let trigger = document.querySelector("#venue-intro")
  console.log({ target, trigger })
  gsap.to(target, {
    duration: 0.5,
    ease: "none",
    // opacity: 1,
    // visibility: "visible",
    autoAlpha: 1,
    scrollTrigger: {
      trigger: trigger,
      start: "center center",
      end: "center center",
      anticipatePin: 1,
      onEnter: () => {
        console.log({ target, trigger })
      },
      onUpdate: () => {
        console.log("UPDATE")
      },
      toggleActions: "play none reverse none",
    },
  })
}

export function navNewsItems(dir, setState) {
  // debugger
  let listItems = document.querySelectorAll("#news .list__item")
  let tl = gsap.timeline({
    onComplete: setState,
  })
  if (dir === "prev") {
    tl.to(listItems, {
      y: -15,
      autoAlpha: 0,

      stagger: 0.05,
    })
  } else {
    tl.to(listItems, {
      y: 15,
      autoAlpha: 0,
      stagger: 0.05,
    })
  }
}
export function fadeInNavItems() {
  let listItems = document.querySelectorAll("#news .list__item")

  gsap.to(listItems, {
    opacity: 1,
    duration: 0.5,
  })
}

export function formBounce(node) {
  if (!node) return

  let bounce = gsap.to(node, {
    paused: true,
    duration: 1,
    ease: "power2.inOut",
    backgroundPositionY: 10,
    yoyo: true,
    repeat: -1,
  })
  return bounce
}

export function splitEventText(node) {
  // todo: pass it a node;

  if (!node) return

  let sign = new SplitText(node, {
    type: "words,chars",
    wordsClass: "split__word",
    charsClass: "split__char",
  })
  gsap.set(".split__word", { clearProps: "all" })
  gsap.set(".split__char", { clearProps: "all" })
}

export function mastHeadToggle(
  dialogRef,
  recordTl,
  isOpen,
  toggleLocked,
  toggleIsRendered,
  setDialogIsClosing
) {
  let hubScroller = document.querySelector("#hub-scroller")
  let tl = dialogRef.current.timeline
  //
  if (tl.isActive()) {
    console.log("active")
    tl.pause()
  }

  if (isOpen) {
    tl.eventCallback("onComplete", null)
    tl.to([dialogRef.current.node, hubScroller], {
      x: "0",
      duration: 0.5,
    }).to(
      hubScroller,
      {
        x: "100%",
      },
      "<"
    )
    tl.play()

    recordTl.current.play()
  } else {
    tl.eventCallback("onComplete", () => {
      toggleIsRendered(false)
      setDialogIsClosing(false)
    })
    tl.to([dialogRef.current.node], {
      x: "-100%",
      duration: 0.5,
    }).to(
      hubScroller,
      {
        x: "0",
      },
      "<"
    )
    tl.play()
  }
  dialogRef.current.isOpen = !dialogRef.current.isOpen
  toggleLocked()
}

export function animateVenueToothPick(selector) {
  let venIlloToothPick = querySafe("#venue-illo-toothpick")
  let actualToothPick = querySafe("#illo-toothpick")

  gsap.to(venIlloToothPick, {
    scrollTrigger: {
      trigger: "#venue-illo-toothpick",
      start: "center bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
  gsap.to(actualToothPick, {
    y: "30%",
    scrollTrigger: {
      trigger: "#venue-illo-toothpick",
      start: "center bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
}

export function animateVenueIlloSputnik() {
  gsap.to("#venue-illo-sputnik-svg", {
    x: viewPortWidth(),
    scrollTrigger: {
      trigger: "#venue-illo-sputnik",
      start: "top bottom",
      end: "bottom top-=100%",
      scrub: 1,
    },
  })

  gsap.to("#illo-sputnik", {
    rotate: 180,
    scrollTrigger: {
      trigger: "#venue-illo-sputnik",
      start: "top bottom",
      end: "bottom top-=100%",
      scrub: 1,
    },
  })
}

export function venueLinesStereo() {
  gsap.to("#lines-stereo g", {
    duration: 0.1,
    scale: 1.1,
    repeat: -1,
    repeatDelay: 0.5,
    transformOrigin: "center center",
    stagger: {
      each: 0.1,
      repeat: 3,
      yoyo: true,
    },
    scrollTrigger: {
      trigger: "#venue-lines-stereo",
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play pause resume pause",
    },
  })
}

export function tlVenueMartini() {
  let tlMartini = gsap.timeline({
    scrollTrigger: {
      trigger: "#lines-martini",
      start: "top-=200 center",
      end: "bottom+=200 bottom",
      scrub: 1,
    },
  })

  tlMartini

    .from("#lines-martini-1 .lines__path", {
      duration: 0.2,
      drawSVG: "100% 100%",
      ease: "none",
    })
    .from(
      "#lines-martini-2 .lines__path",
      { duration: 0.3, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-3 .lines__path",
      { duration: 0.4, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-4 .lines__path",
      { duration: 0.5, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-5 .lines__path",
      { duration: 0.6, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-6 .lines__path",
      { duration: 0.7, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-7 .lines__path",
      { duration: 0.8, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-8 .lines__path",
      { duration: 0.9, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-9 .lines__path",
      { duration: 1.0, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-10 .lines__path",
      { duration: 1.1, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-11 .lines__path",
      { duration: 1.2, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-12 .lines__path",
      { duration: 1.3, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-13 .lines__path",
      { duration: 1.4, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-14 .lines__path",
      { duration: 1.5, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-15 .lines__path",
      { duration: 1.6, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-16 .lines__path",
      { duration: 1.7, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-17 .lines__path",
      { duration: 1.8, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-18 .lines__path",
      { duration: 1.9, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-19 .lines__path",
      { duration: 2.0, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-20 .lines__path",
      { duration: 2.1, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-21 .lines__path",
      { duration: 2.2, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-22 .lines__path",
      { duration: 2.3, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-23 .lines__path",
      { duration: 3.3, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
    .from(
      "#lines-martini-24 .lines__path",
      { duration: 3.3, drawSVG: "100% 100%", ease: "none" },
      "<"
    )
}
