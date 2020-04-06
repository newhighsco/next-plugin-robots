const exportRobots = require('./export')

module.exports = (nextConfig = {}) => {
  const { robots = {}, sitemap = {} } = nextConfig

  nextConfig.robots = {
    filename: 'robots.txt',
    userAgent: '*',
    sitemap,
    ...robots
  }

  return Object.assign({}, nextConfig, {
    exportPathMap: exportRobots(nextConfig)
  })
}
