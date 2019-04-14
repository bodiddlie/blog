const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    if (node.frontmatter.title === '') return;
    const baseSlug = createFilePath({ node, getNode, basePath: 'posts' });
    let nameArr = baseSlug.replace(/\//g, '').split('-');
    //date = nameArr.splice(0, 3).join("-");
    const slug = '/' + nameArr.slice(3).join('-') + '/';
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'postType',
      value: 'mdx',
    });
    createNodeField({
      node,
      name: 'sortDate',
      value: node.frontmatter.date,
    });
  } else if (node.internal.type === `ContentfulBlogPost`) {
    const { title } = node;
    const slug = '/' + title.toLowerCase().replace(/\s/g, '-') + '/';
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'postType',
      value: 'contentful',
    });
    createNodeField({
      node,
      name: 'sortDate',
      value: node.postDate,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const contentfulPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.data) {
        result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
              slug: node.fields.slug,
              id: node.id,
            },
          });
        });
      }
      resolve();
    });
  });

  const mdxPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/mdx-post.js'),
          context: {
            slug: node.fields.slug,
            id: node.id,
          },
        });
      });
      resolve();
    });
  });

  return Promise.all([contentfulPosts, mdxPosts]);
};
