const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    {
      allWpPage {
        edges {
          node {
            template {
              templateName
            }
            content
            id
            slug
            title
            uri
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }
    let cptsSlugs = ["home", "news", "venue", "event-calendar"]
    // todo: create a separate interior template for proof of concept;
    // Create blog post pages.
    result.data.allWpPage.edges.forEach((edge) => {
      if (!cptsSlugs.includes(edge.node.slug)) {
        createPage({
          // Path for this page — required
          path: `${edge.node.uri}`,
          component: pageTemplate,
          context: {
            id: edge.node.id,
            // Add optional context data to be inserted
            // as props into the page component.
            //
            // The context data can also be used as
            // arguments to the page GraphQL query.
            //
            // The page "path" is always available as a GraphQL
            // argument.
          },
        })
      }
    })
  })
}
