import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Heading, Header } from "../atoms"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/autoplay"
// import "swiper/css/bundle"

export default function VenueSwiper({ detailsGallery1, config }) {
  if (!detailsGallery1) return

  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      // spaceBetween={50}
      // slidesPerView={1}
      speed={1000}
      // autoplay={true}
      autoplay={{
        delay: 1500,
      }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {detailsGallery1.map((img, idx) => {
        return (
          <SwiperSlide>
            <GatsbyImage
              alt={img.altText}
              image={getImage(img.localFile)}
              loading=""
              className="hubPaneObj block w-full h-full object-cover object-[center-top]"
              imgClassName=""
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
