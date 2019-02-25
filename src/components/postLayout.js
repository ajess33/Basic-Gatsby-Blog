import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

/*
Static Query:
  Pro: Can be used anywhere
  Con: Doesn't accept variables
       Can't use context with it
*/

/*
Page Query:
  Pro:
  Con: Must be used on pages
*/

export default class postLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data
    return (
      <Layout>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <p>{markdownRemark.frontmatter.date}</p>
        <div
          dangerouslySetInnerHTML={{
            // must be set to our actual html (data.markdownRemark.html)
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    )
  }
}

// PAGE QUERY

// Must be exported as a named query

// $slug is a variable that allows the route URL to change based on the name of the blog post
// slug is passed in from the context in gatsby-node.js so it must be same name as in context
export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`
