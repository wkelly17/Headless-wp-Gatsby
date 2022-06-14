// support for .env, .env.development, and .env.production
require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "http://localhost:8888/WpeAtlasTestBackend/graphql",
    title: "Gatsby WordPress Homepage Starter",
    author: `Gatsby`,
    description: "A Gatsby Starter for building homepages with WordPress",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.WPGRAPHQL_URL,
        debug: {
          preview: true,
          graphql: {
            showQueryOnError: true,
          },
        },
        schema: {
          timeout: 155000,
          perPage: 50,
        },
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-transition-link",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: ["/src/css"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Starter WordPress Homepage",
        short_name: "Gatsby",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffffff",
        theme_color: "#004ca3",
        icon: "src/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: "hff1lww",
        },
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "wpSearch",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: {
          suggest: true,
          index: [
            {
              field: "title",
              resolution: 2,
            },
            {
              field: "content",
              resolution: 9,
            },
          ],
        },

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        query MyQuery {
          allWpContentNode {
            nodes {
              databaseId
              id
              link
              nodeType
              ... on WpPage {
                id
                title
                link
                content
              }
              ... on WpMediaItem {
                id
                alt
                title
              }
              ... on WpPost {
                id
                title
                link
                content
              }
            }
          }
        }        
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["id", "title", "content"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["id", "title", "link", "content", "nodeType"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allWpContentNode.nodes.map((node) => ({
            id: node.id,
            link: node.link,
            title: node.title,
            content: node.content || null,
            nodeType: node.nodeType,
          })),
      },
    },
  ],
}
