require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `skovy.dev`,
    author: `Spencer Miskoviak`,
    description: `Ramblings on React, TypeScript, Design Systems, other frontend tech, and occassionally other things by Spencer Miskoviak`,
    siteUrl: `https://skovy.dev`,
    social: {
      twitter: `spencerskovy`,
      github: `skovy`,
      goodreads: `64661635-spencer-miskoviak`,
      youtube: `UCbyBv235FuRg_C6oKf-OeTg`,
      stackOverflow: `2690790`
    },
    otherPodcasts: [
      {
        guid: `rru-044-typescript-with-spencer-miskoviak`,
        title: `RRU 044: TypeScript with Spencer Miskoviak`,
        link: `https://devchat.tv/react-round-up/rru-044-typescript-with-spencer-miskoviak/`,
        itunes: {
          image: `https://devchat.tv/images/podcasts/reactroundup-500.jpg`
        }
      }
    ],
    talks: [
      {
        id: "8XcYt3El08Y",
        title: "Decoupling a component's style from it's semantic meaning",
        description: "💡 Component design pattern"
      },
      {
        id: "hDkcBC-vmgM",
        title: "Codemod-ing away 4MB of JavaScript",
        description: "⚡ Lightning talk at React Conf 2019"
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              related: false, 
              noIframeBorder: true, 
              containerClass: 'blog-post-youtube-video'
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              backgroundColor: "#fafafa"
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
      }
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Spencer Miskoviak`,
        short_name: `skovy.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#9448BC`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://rss.simplecast.com/podcasts/8230/rss`,
        name: `RubberDucking`,
        parserOption: {
          customFields: {
            item: ["description"]
          }
        }
      }
    },
    {
      resolve: "@jamesdanylik/gatsby-source-goodreads",
      options: {
        key: process.env.GOODREADS_API_KEY,
        id: "64661635-spencer-miskoviak"
      }
    },
    {
      resolve: "gatsby-plugin-sitemap"
    }
  ]
};
