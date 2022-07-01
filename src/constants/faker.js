let isDev = process.env.GATSBY_DEV

let fakerInstance = {}
let fakerModule
async function getFaker() {
  // debugger
  if (!isDev) {
    return "DEV MODE TEST"
  }
  if (fakerInstance.module) {
    return fakerInstance
  }
  return new Promise(async (res, rej) => {
    try {
      // debugger
      let { faker } = await import(`@faker-js/faker`)
      faker.seed(10)
      fakerModule = faker
      fakerInstance.module = faker
      fakerInstance.fakePost = fakePost
      res(fakerInstance)
    } catch (err) {
      console.log(err)
      rej(fakerInstance)
    }
  })
}
fakerInstance.getFaker = getFaker

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function fakePost() {
  const titleWordsNum = randomIntFromInterval(1, 6)
  const paragraphRan = randomIntFromInterval(1, 5)
  // const excerptRan = randomIntFromInterval(5, 25)
  return {
    title: fakerModule.lorem.words(titleWordsNum),
    post_author: fakerModule.name.findName(),
    post_date: fakerModule.date.recent(100),
    post_date_gmt: null,
    post_content: fakerModule.lorem.paragraphs(paragraphRan),
    post_category: fakerModule.word.adjective(),
    post_excerpt: fakerModule.lorem.words(titleWordsNum),
    post_status: "published",
    post_name: fakerModule.lorem.words(titleWordsNum),
    post_modified: null,
    slug: null,
    image: fakerModule.image.animals(),
  }
}

export default fakerInstance
