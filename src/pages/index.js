import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../components/layout';

const Container = styled.div`
  max-width: 1000px;
`;

const Heading = styled.h1`
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  color: #2a7ae2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DateLine = styled.span`
  color: #828282;
  font-size: 0.9rem;
`;

const H2 = styled.h2`
  font-weight: 400;
  margin: 0;
  margin-bottom: 0.9rem;
`;

export default ({ data }) => {
  const allPosts = [...data.allContentfulBlogPost.edges, ...data.allMdx.edges];
  const allPostsSorted = _.orderBy(
    allPosts,
    ['node.fields.sortDate'],
    ['desc']
  );

  return (
    <Layout>
      <Container>
        <Heading>{data.site.siteMetadata.title}</Heading>
        {allPostsSorted.map(({ node }) => (
          <React.Fragment key={node.id}>
            {node.fields.postType === 'mdx' ? (
              <div key={node.id}>
                <DateLine>{node.frontmatter.date}</DateLine>
                <H2>
                  <StyledLink to={node.fields.slug}>
                    {node.frontmatter.title}
                  </StyledLink>
                </H2>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            ) : (
              <div key={node.id}>
                <DateLine>{node.postDate}</DateLine>
                <H2>
                  <StyledLink to={node.fields.slug}>{node.title}</StyledLink>
                </H2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.body.childMdx.excerpt,
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [postDate], order: DESC }) {
      edges {
        node {
          id
          body {
            childMdx {
              excerpt(pruneLength: 400)
            }
          }
          title
          postDate(formatString: "MMM DD, YYYY")
          fields {
            slug
            sortDate
            postType
          }
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { title: { ne: "" } } }
    ) {
      edges {
        node {
          id
          code {
            body
          }
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
          }
          fields {
            slug
            sortDate
            postType
          }
          excerpt(pruneLength: 400)
        }
      }
    }
  }
`;
