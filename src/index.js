const exportRobots = require('./export')

module.exports = (nextConfig = {}) => {
  const { robots = {} } = nextConfig

  nextConfig.robots = {
    filename: 'robots.txt',
    userAgent: '*',
    ...robots
  }

  return Object.assign({}, nextConfig, {
    exportPathMap: exportRobots(nextConfig)
  })
}
