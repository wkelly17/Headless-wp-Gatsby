import * as React from "react"

import { Box, Heading, List, ListItem, Header, Loader } from "../atoms"
import { GatsbyImage } from "gatsby-plugin-image"

export default function EventsCalItems({ isLoading, isError, data }) {
  if (isLoading) {
    return <Loader />
  } else if (isError) {
    return <div>Whoops an error!</div>
  } else if (data) {
    let events = data?._embedded.events
    let byMonth = reshapeEventsData(events)
    return (
      <Box className="relative z-[2]">
        <List>
          {byMonth.map((month, idx) => {
            return (
              <ListItem
                key={`${month.month}-${month.year}`}
                className="relative z-0 origin-center"
              >
                <Box className="calendar__header h4 d:pb-2 d:border-y-4 border-grayDarker border-y-2 d:h-[5vw] items-center flex h-[20vw] px-8">
                  {month.month} {month.year}
                </Box>
                <List className="calendar_content ">
                  {month.events.map((event, idx) => {
                    return (
                      <ListItem className="list-item" key={event.url}>
                        <a
                          href={event.url}
                          className="d:h-[5vw] grid grid-cols-18 border-b border-grayDarker d:border-b-2"
                        >
                          <Box className="relative justify-center col-start-1 col-end-4 border-r d:col-end-2 d:flex d:items-center border-grayDarker d:border-r-2">
                            <span className="h5 vertAfterMin">
                              ${getReadableDate(event.dates.start.dateTime)}{" "}
                            </span>
                          </Box>
                          <Box className="relative justify-center hidden col-start-3 col-end-2 border-r d:block d:col-end-2 d:items-center border-grayDarker d:border-r-2">
                            <img
                              src={getSmallest16x9(event)}
                              alt=""
                              className="calendar__item__img h-full left-0 object-cover absolute top-0 w-full"
                            />
                          </Box>
                          <Box className="relative justify-between col-start-6 col-end-12 pb-2 border-r d:col-start-5 d:col-end-14 d:pb-0 d:items-center border-grayDarker d:border-r-2 d:flex">
                            <Heading
                              as="h2"
                              className="font-normal d:pl-8 d:pb-2 font-condensed text-[1.5rem] d:text-[2rem]"
                            >
                              {event.name}
                            </Heading>
                            <span className="calendar__item__cta pb-2 h5 !text-primary d:w-[14.285%] d:flex d:h-full d:transition-colors d:justify-center d:items-center hover:bg-primary hover:!text-white">
                              Buy Tickets
                            </span>
                          </Box>
                        </a>
                      </ListItem>
                    )
                  })}
                </List>
              </ListItem>
            )
          })}
        </List>
      </Box>
    )
  }
}

function getReadableDate(dateTime) {
  let date = new Date(dateTime)
  let options = {
    weekday: "short",
    day: "numeric",
  }
  return new Intl.DateTimeFormat("en-US", options).format(date)
}
function getBiggest16x9(array) {
  let whichImages
  let hasCustom = array.filter((img) => {
    img.url.includes("dbimages")
  })
  if (hasCustom.length >= 2) {
    whichImages = hasCustom
  } else {
    whichImages = array.filter((image) => !image.url.includes("dbimages"))
  }

  let aspect16 = whichImages.filter((img) => {
    return img.ratio == "16_9"
  })
  aspect16.sort((a, b) => {
    return b.width - a.width
  })

  if (aspect16.length) {
    return aspect16[1]?.url || aspect16[0].url || null
  } else {
    return null
  }
}
function getSmallest16x9({ images, name }) {
  let whichImages
  let hasCustom = images.filter((img) => {
    img.url.includes("dbimages")
  })
  if (hasCustom.length >= 2) {
    whichImages = hasCustom
  } else {
    whichImages = images.filter((image) => !image.url.includes("dbimages"))
  }

  // images.forEach((im) => console.log(`${name} with ${im.url}`));
  let aspect16 = whichImages.filter((img) => {
    return img.ratio == "16_9"
  })
  aspect16.sort((a, b) => {
    return a.width - b.width
  })

  if (aspect16.length) {
    return aspect16[1]?.url || aspect16[0].url || null
  } else {
    return null
  }
}
function reshapeEventsData(events) {
  let byMonth = []
  events.forEach((event) => {
    let startDate = new Date(event.dates.start.dateTime)

    let month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      startDate
    )
    let monthIdx = startDate.getMonth()
    let year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
      startDate
    )
    let correspondingObj = byMonth.find((obj) => {
      return obj.month == month && obj.year == year
    })
    if (correspondingObj) {
      correspondingObj.events.push(event)
    } else {
      byMonth.push({
        month: month,
        year: year,
        monthIdx: monthIdx,
        events: [event],
      })
    }
  })
  byMonth
    .sort((a, b) => {
      return a.year - b.year
    })
    .sort((a, b) => {
      return a.monthIdx - b.monthIdx
    })
    .forEach((month) => {
      month.events.sort((a, b) => {
        return (
          new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime)
        )
      })
    })
  return byMonth
}
