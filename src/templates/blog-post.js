import React from 'react';
import styled from 'styled-components';
import ReactDisqusComments from 'react-disqus-comments';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from '../components/layout';

const Container = styled.div`
  max-width: 1000px;
`;

const Heading = styled.div`
  border-bottom: 1px solid #eee;
`;

const H1 = styled.h1`
  font-weight: 400;
  margin: 0;
`;

const DateLine = styled.span`
  color: #828282;
`;
export default ({ data }) => {
  const post = data.contentfulBlogPost;
  const { url } = data.site.siteMetadata;
  return (
    <Layout>
      <Container>
        <Heading>
          <H1>{post.title}</H1>
          <DateLine>{post.date}</DateLine>
        </Heading>
        <MDXRenderer>
          {data.contentfulBlogPost.body.childMdx.code.body}
        </MDXRenderer>
        {post.comments ? (
          <ReactDisqusComments
            shortname="regnipelk"
            url={`${url}${post.fields.slug}`}
            title={post.title}
            identifier={post.fields.slug}
          />
        ) : null}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    contentfulBlogPost(id: { eq: $id }) {
      body {
        childMdx {
          code {
            body
          }
        }
      }
      title
      comments
      postDate(formatString: "MMM DD, YYYY")
      fields {
        slug
      }
    }
  }
`;
