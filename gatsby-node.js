// part of node so don't need to install
const path = require("path")

// everytime gatsby is loaded it will create a page at 'path' from the 'component'
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `).then(results => {
      // 'node' must be destructured {}
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          // dont need / after posts because the slug in graphql already has it
          path: `/posts${node.frontmatter.slug}`,
          component: path.resolve("./src/components/postLayout.js"),
          // allows us to have access to slug in postLayout
          context: {
            slug: node.frontmatter.slug,
          },
        })
      })
      resolve()
    })
  })
}
