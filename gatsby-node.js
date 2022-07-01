const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page.js`)
  const specialTemplate = path.resolve(`src/templates/alt-template.js`)
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
    function resolveTemplate(edge) {
      console.log(edge.node.template)
      if (
        edge.node.template.templateName == "Special Headless Column Template"
      ) {
        return specialTemplate
      } else {
        return pageTemplate
      }
    }

    result.data.allWpPage.edges.forEach((edge) => {
      if (!cptsSlugs.includes(edge.node.slug)) {
        if (
          edge.node.template.templateName == "Special Headless Column Template"
        ) {
          createPage({
            // Path for this page — required
            path: `${edge.node.uri}`,
            component: specialTemplate,
            context: {
              id: edge.node.id,
            },
          })
        } else {
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
      }
    })
  })
}
