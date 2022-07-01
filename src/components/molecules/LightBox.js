import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"

import { Box, Text, Button, IconCloseSvg } from "../atoms"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useKey } from "react-use"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
// import "swiper/components/navigation/navigation.css"
// import "swiper/components/pagination/pagination.css"

export default function LightBox({ images, isOpen, setIsOpen }) {
  useKey("ArrowRight", () => {
    let nextBtn = document.querySelector("#lightBoxNextBtn")
    if (nextBtn) {
      nextBtn.focus()
      nextBtn.click()
    }
  })
  useKey("ArrowLeft", () => {
    let prevBtn = document.querySelector("#lightBoxPrevEl")
    if (prevBtn) {
      prevBtn.focus()
      prevBtn.click()
    }
  })

  return (
    <Dialog
      id="lightbox"
      static
      as="div"
      open={isOpen}
      onClose={(e) => {
        setIsOpen(false)
      }}
      className={`fixed top-0 right-0 z-50 w-full h-full findme ${
        !isOpen && "hidden"
      }`}
      aria-hidden={!isOpen && "true"}
    >
      <div
        className="absolute top-0 left-0 block w-full h-full dialogBackdrop bg-black/95"
        aria-hidden={true}
      ></div>

      <Box className="relative w-full h-full">
        <Dialog.Panel className="relative w-full h-full">
          <Box className="absolute left-0 w-full -translate-y-1/2 top-1/2">
            <Swiper
              className={`test`}
              modules={[Navigation, Pagination]}
              loop={true}
              navigation={{
                nextEl: "#lightBoxNextBtn",
                prevEl: "#lightBoxPrevEl",
              }}
              pagination={{
                el: ".lightbox__pag",
                type: "fraction",
              }}
              loopedSlides={Infinity}
              centeredSlides={true}
              breakpoints={{
                1200: {
                  grabCursor: true,
                  // centeredSlides: true,
                  slidesPerView: "auto",
                  spaceBetween: window.innerWidth / 20,
                },
              }}
            >
              {images.map((img, idx) => {
                return (
                  <SwiperSlide
                    key={img.localFile?.id}
                    className={`max-w-[60%] opacity-25 !w-auto !h-[65vh] flex flex-col items-center lightBoxFigure`}
                    tag="figure"
                  >
                    <GatsbyImage
                      alt={img.altText}
                      image={getImage(img.localFile)}
                      className="!h-full overflow-visible lightBoxImg"
                      imgClassName="!h-full !max-w-full"
                    />
                    <figcaption>caption</figcaption>
                  </SwiperSlide>
                )
              })}
              <Box
                id="lightboxNav"
                className="relative flex items-center justify-center mt-8"
              >
                <Button id="lightBoxPrevEl" className="text-white ">
                  <span className="sr-only">Previous Image</span>
                  Previous
                </Button>
                <Box className="px-8 text-white lightbox__pag !w-max" />
                <Button id="lightBoxNextBtn" className="ml-2 text-white ">
                  <span className="sr-only">Next Image </span>
                  Next
                </Button>
              </Box>
            </Swiper>
          </Box>
          <Button
            id="drawer-close"
            tabIndex={0}
            onClick={() => {
              setIsOpen(false)
            }}
            className=" text-primary  block d:pt-[10%] !absolute top-0 right-0 w-[10%]"
          >
            <span className="sr-only">Close Lightbox</span>
            <IconCloseSvg className="absolute transition-colors duration-300 ease-linear transform -translate-x-1/2 -translate-y-1/2 !fill-current text-inherit left-1/2 top-1/2" />
          </Button>
        </Dialog.Panel>
      </Box>
    </Dialog>
  )
}
