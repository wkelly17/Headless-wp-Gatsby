import { gsap } from "gsap"
import { qf, viewPortWidth, querySafe } from "../utilities/gsap"
import { DOM } from "../constants/constants"

//!================================
//!=============== EVENTS  =============
//!=================================
export function Home2EventsExit({ node, e, exit, entry }, needDur = false) {
  if (!node) return
  let hubScroller = DOM.hubScroller.get()
  let section = DOM.homeHubSection3.get()
  let sectionBorder = DOM.homeHubSection3Border.get()
  // let img = (section && section.querySelector("img")) || {}
  let img = querySafe("img", needDur, section)
  let header = DOM.masthead.get()

  let headerWidth = header.offsetWidth
  // let headerHeight = header.offsetHeight

  let sectionX = (section.offsetLeft - headerWidth) * -1
  // let sectionY = (section.offsetTop - window.pageYOffset) * -1

  let sectionPrev = section.previousElementSibling
  let sectionNext = section.nextElementSibling

  let tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      // debugger
    },
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
        width: viewPortWidth() - headerWidth,
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
      gridTemplateRows: "60vh",
    })

  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}
export function EventsFromHomeEntry({ node, e, exit, entry }, needDur = false) {
  let tl = gsap.timeline({
    paused: true,
  })
  // tl.from(node, {
  //   opacity: 0,
  //   duration: 0.5,
  // })
  // if (entry && entry.play) {
  //   tl.play()
  // }
  if (needDur) {
    return tl.duration()
  }
}

//!================================
//!=============== VENUE  =============
//!=================================
export function Home2VenueExit({ node, e, exit, entry }, needDur = false) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  let hubScroller = DOM.hubScroller.get()
  let section = DOM.homeHubSection2.get()
  let sectionBorder = DOM.homeHubSection2Border.get()
  let sectionPane = DOM.homeHubSection2Pane.get()
  let sectionLines = DOM.homeHubSection2Lines.get()
  let header = DOM.masthead.get()

  let headerWidth = header.offsetWidth
  // let headerHeight = header.offsetHeight

  let sectionX = (section.offsetLeft - headerWidth) * -1
  // let sectionY = (section.offsetTop - window.pageYOffset) * -1
  // let sectionPrev = section.previousElementSibling
  // let sectionNext = section.nextElementSibling

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
        width: viewPortWidth() - headerWidth,
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

export function toVenueEnter({ node, e, exit, entry }, needDur = false) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })
  let pageHeader = document.querySelector(".venue_title")
  //

  tl.from(pageHeader, {
    y: "25%",
    duration: 0.5,
    ease: "expo.out",
  }).from(
    pageHeader,
    {
      opacity: 0,
      duration: 0.3,
      ease: "none",
    },
    "<"
  )
  if (entry && entry.play) {
    tl.play()
  }
}
export function Home2News(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  let hubScroller = DOM.hubScroller.get()
  let section = DOM.homeHubSection4.get()
  let sectionBtn = DOM.homeHubSection4Btn.get()
  let sectionBorder = DOM.homeHubSection4Border.get()

  let sectionListItems = [
    ...(section.querySelectorAll("#hub-section-4-list li") || {}),
  ]
  let header = DOM.masthead.get()

  let headerWidth = header.offsetWidth
  // let headerHeight = header.offsetHeight
  let sectionX = (section.offsetLeft - headerWidth) * -1
  let sectionY = (section.offsetTop - window.pageYOffset) * -1

  let sectionNextX = section.offsetLeft - section.offsetWidth + headerWidth

  let sectionNext = section.nextElementSibling
  let sectionLast = sectionNext.nextElementSibling

  if (isDesktop) {
    tl.to(hubScroller, {
      duration: 0.8,
      ease: "expo.out",
      x: sectionX,
    })

      .to(
        [sectionNext, sectionLast],
        {
          duration: 0.8,
          ease: "expo.out",
          x: sectionNextX,
        },
        "<"
      )

      .to(
        sectionListItems,
        {
          duration: 0.3,
          ease: "none",
          autoAlpha: 1,
        },
        "<"
      )

      .to(
        sectionBtn,
        {
          duration: 0.3,
          ease: "none",
          opacity: 0,
        },
        "<"
      )
  } else {
    tl.to(hubScroller, {
      duration: 0.8,
      ease: "expo.out",
      y: sectionY,
    })

      .to(
        sectionListItems,
        {
          duration: 0.3,
          ease: "none",
          autoAlpha: 1,
        },
        "<"
      )

      .to(
        [sectionBtn, sectionBorder],
        {
          duration: 0.3,
          ease: "none",
          opacity: 0,
        },
        "<"
      )
  }
  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}

//!================================
//!=============== NEWS  =============
//!=================================
export function NewsFromHomeEnter(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  let news = document.querySelector("#news")
  let newsItems = news.querySelectorAll(".list__item")

  let item4 = newsItems[3]
  let item5 = newsItems[4]
  let item6 = newsItems[5]

  if (isDesktop) {
    // todo: animated pagination
  } else {
    tl.from([item4, item5, item6], {
      duration: 0.8,
      ease: "expo.out",
      y: "3rem",
      opacity: 0,
    })
  }

  if (entry && entry.play) {
    tl.play()
  }
}

export function toNewsSingleLeave(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  //=============== SELECTORS  =============
  let hubScroller = DOM.hubScroller.get()
  let section = DOM.homeHubSection4.get()

  // let sectionBtn = qf(node, "#hub-section-4-btn")
  let sectionBorder = DOM.homeHubSection4Border.get()
  let sectionCol = DOM.homeHubSection4Col.get()

  // let sectionListItems = [...section.querySelectorAll("#hub-section-4-list li")]

  let header = DOM.masthead.get()
  let headerWidth = header.offsetWidth
  // let headerHeight = header.offsetHeight
  let sectionX = (section.offsetLeft - headerWidth) * -1
  let sectionY = (section.offsetTop - window.pageYOffset) * -1

  let sectionNextX = section.offsetLeft - section.offsetWidth + headerWidth

  let sectionNext = section.nextElementSibling
  let sectionLast = sectionNext.nextElementSibling

  //=============== ANIMATIONS  =============

  if (isDesktop) {
    tl.to(hubScroller, {
      duration: 0.8,
      ease: "expo.out",
      x: sectionX,
    })

      .to(
        [sectionNext, sectionLast],
        {
          duration: 0.8,
          ease: "expo.out",
          x: sectionNextX,
        },
        "<"
      )

      .to(
        sectionCol,
        {
          duration: 0.3,
          ease: "none",
          opacity: 0,
        },
        "<"
      )
  } else {
    tl.to(hubScroller, {
      duration: 0.8,
      ease: "expo.out",
      y: sectionY,
    }).to(
      [sectionBorder, sectionCol],
      {
        duration: 0.3,
        ease: "none",
        opacity: 0,
      },
      "<"
    )
  }
  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}
export function toNewsSingleEnter(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  if (isDesktop) {
    // todo: animated pagination
  } else {
  }

  if (entry && entry.play) {
    tl.play()
  }
}

//!================================
//!=============== NEWS ARCHIVE  =============
//!=================================

export function ExitFromNewsArchiveToSingle(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  //=============== SELECTORS  =============
  let mainInner = querySafe("#news-inner", needDur)
  // todo: put footer back in;
  let footer = querySafe("#colophon", needDur)

  //=============== ANIMATIONS  =============
  tl.to([mainInner], {
    duration: 0.5,
    opacity: 0,
    y: "3rem",
    ease: "expo.out",
  })
  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}

export function FromNewsArchiveSingleEnter(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  if (isDesktop) {
    // todo: animated pagination
  } else {
  }

  if (entry && entry.play) {
    tl.play()
  }
}

//!================================
//!=============== CONTACT  =============
//!=================================

//!================================
//!=============== MASTHEAD LINK  =============
//!=================================
export function ExitToHomeFromMastheadLogo(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  //=============== SETUP  =============
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })

  //=============== SELECTORS  =============
  let main = querySafe("main")
  // todo: put footer back in
  let footer = querySafe("#colophon")

  //=============== ANIMATIONS  =============

  tl.to([main], {
    duration: 0.8,
    ease: "expo.out",
    x: "-100%",
  })

  //=============== CONTROLS  =============
  if (exit && exit.play) {
    tl.play()
  }
  if (needDur) {
    return tl.duration()
  }
}

export function toHomeEnter(
  { node, e, exit, entry },
  needDur = false,
  isDesktop = true
) {
  if (!node) return
  let tl = gsap.timeline({
    paused: true,
  })
  let thing = querySafe("main")
  tl.set(thing, {
    opacity: 0,
  })
  tl.to(thing, {
    opacity: 1,
    duration: 1,
  })

  if (isDesktop) {
  } else {
  }

  if (entry && entry.play) {
    tl.play()
  }
}

//!================================
//!=============== Interior 1  =============
//!=================================

//!================================
//!=============== Interior 2  =============
//!=================================

//!================================
//!=============== Privacy  =============
//!=================================

export function initialPageAnimation() {
  console.log(window.location)
  // let path = window.location.pathname

  // if (path == "/news") {
  //   console.log("news initial")
  // } else if (path == "/") {
  //   console.log("home initial")
  // }
}
