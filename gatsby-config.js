module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-newrelic',
      options: {
        configs: {
          instrumentationType: 'proAndSPA',
            accountId: '1147177',
            trustKey: '1147177',
            agentID: '930361062',
            licenseKey: 'd2dacf146e',
            applicationID: '930361062',
            beacon: 'bam.nr-data.net',
            errorBeacon: 'bam.nr-data.net'
        }
      }
    },
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `Gary Spencers Blog`,
    author: `Gary Spencer`,
    description: `A few things I have written in years gone by.`,
    siteUrl: `https://gspncr.github.io`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/gspncr`,
      },
      {
        name: `github`,
        url: `https://github.com/gspncr`,
      },
    ],
  },
}
