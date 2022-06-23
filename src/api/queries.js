import { useQuery, useMutation } from "react-query"
import { GraphQLClient, gql } from "graphql-request"
import { useLocalStorage } from "react-use"
const API_URL = "http://localhost:8888/WpeAtlasTestBackend/graphql"
console.log(API_URL)
const graphQLClient = new GraphQLClient(API_URL)

export function useGetPosts() {
  console.log("running get posts")
  let queryFn = async () => {
    let query2 = gql`
      {
        posts {
          nodes {
            content
            title
          }
        }
      }
    `
    const data = await graphQLClient.request(query2)
    return data.posts.nodes
  }

  return useQuery("get-posts", queryFn)
}

export function useLogin() {
  console.log("running useLogin")
  let storedLogin
  if (localStorage.getItem("jwt")) {
    storedLogin = JSON.parse(localStorage.getItem("jwt"))
  }
  const [login, setLogin, removeLogin] = useLocalStorage("jwt", "")

  let queryFn = async () => {
    console.log("trying login")
    let mutation = gql`
      mutation {
        login(input: { password: "pass", username: "bpwpeatlastes1" }) {
          clientMutationId
          authToken
          refreshToken
          user {
            name
          }
        }
      }
    `
    const data = await graphQLClient.request(mutation)

    console.log({ data })
    let { authToken, refreshToken } = data.login
    //300,000 = 300 seconds in MS; or 5 mins;
    if (data.login) {
      setLogin({
        authToken,
        refreshToken,
        expires: 300000,
        current: Date.now(),
      })
    }
    return data
  }

  return useMutation(queryFn, {
    mutationKey: "login",
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return variables
    },
    onError: (error, variables, context) => {
      // An error happened!

      console.log(error)
      console.log(`rolling back optimistic update with id ${context.id}`)
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!

      console.log(data)
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log({ data })
    },
  })
}

export function useGravityForm(id) {
  console.log("get GF")
  let queryFn = async () => {
    let query = gql`
      query MyQuery($id: ID = "1") {
        gfForm(id: $id, idType: DATABASE_ID) {
          id
          formFields {
            nodes {
              id
              type
              visibility
              ... on AddressField {
                id
                addressType
                description
                inputName
                inputType
                inputs {
                  label
                  name
                  id
                  defaultValue
                  placeholder
                  isHidden
                }
                isRequired
                label
                type
                value
              }
              ... on CheckboxField {
                id
                label
                description
                cssClass
                inputs {
                  id
                  name
                  label
                }
              }
              ... on DateField {
                id
              }
              ... on TextField {
                id
                defaultValue
                description
                isRequired
                label
              }
            }
          }
        }
      }
    `
    let variables = {
      id: id,
    }
    console.log({ variables })
    const data = await graphQLClient.request(query, variables)
    console.log({ data })
    return data
  }

  return useQuery("get-gravity-form", queryFn)
}

export function useSubmitGravityForm(variables) {
  let queryFn = async (variables) => {
    console.log("trying gravity submit")
    let mutation = gql`
      mutation MyMutation(
        $fieldValues: [FormFieldValuesInput] = []
        $id: ID = "1"
      ) {
        submitGfForm(input: { id: $id, fieldValues: $fieldValues }) {
          errors {
            id
            message
          }
        }
      }
    `

    const data = await graphQLClient.request(mutation, variables)
    console.log({ data })

    //300,000 = 300 seconds in MS; or 5 mins;

    return data
  }

  return useMutation(queryFn, {
    mutationKey: "submitGf",
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return variables
    },
    onError: (error, variables, context) => {
      // An error happened!

      console.log(error)
      console.log(`rolling back optimistic update with id ${context.id}`)
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!

      console.log(data)
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log({ data })
    },
  })
}

export function useGetTicketMaster() {
  let url =
    "https://app.ticketmaster.com/discovery/v2/events?apikey=hgYKY0yYFPxZyFWHWcCl5Wz2dPSoOqgc&venueId=KovZpa3Ize&locale=*"
  let queryFn = async () => {
    try {
      let response = await fetch(url)
      if (!response.ok) {
        throw new Error("tck response not ok")
      }
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return useQuery("get-ticketMaster", queryFn)
}
