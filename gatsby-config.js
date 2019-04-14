module.exports = {
  siteMetadata: {
    title: "Nick Klepinger's Blog",
    url: 'https://klepinger.dev',
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        accessToken: `961c0f659f2a57a3ec7dbdc9d2fe086dda00f0aa05c32b115f038964b01a99d3`,
        spaceId: `78a81pbn0vdd`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-73423130-1',
      },
    },
    `gatsby-transformer-remark`,
  ],
};
