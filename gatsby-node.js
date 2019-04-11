const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const baseSlug = createFilePath({ node, getNode, basePath: 'posts' });
    let nameArr = baseSlug.replace(/\//g, '').split('-');
    //date = nameArr.splice(0, 3).join("-");
    const slug = '/' + nameArr.slice(3).join('-') + '/';
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx {
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
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: node.fields.slug,
            id: node.id,
          },
        });
      });
      resolve();
    });
  });
};
