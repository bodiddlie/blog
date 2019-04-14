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
  const post = data.mdx;
  const { url } = data.site.siteMetadata;
  return (
    <Layout>
      <Container>
        <Heading>
          <H1>{post.frontmatter.title}</H1>
          <DateLine>{post.frontmatter.date}</DateLine>
        </Heading>
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
        <ReactDisqusComments
          shortname="regnipelk"
          url={`${url}${post.fields.slug}`}
          title={post.frontmatter.title}
          identifier={post.fields.slug}
        />
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query MdxPostQuery($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    mdx(id: { eq: $id }) {
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;
