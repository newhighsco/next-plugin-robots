// const { writeFile } = require('fs-extra')
const { createWriteStream } = require('fs')
const { join } = require('path')

module.exports = (nextConfig = {}) => async (...args) => {
  const { robots = {} } = nextConfig
  const [defaultPathMap, { dev, outDir }] = args

  if (!dev && robots) {
    const {
      filename,
      userAgent,
      allowPaths = [],
      disallowPaths = [],
      sitemap
    } = robots
    const output = []

    if (userAgent) output.push(`User-agent: ${userAgent}`)

    allowPaths.map(path => output.push(`Allow: ${path}`))
    disallowPaths.map(path => output.push(`Disallow: ${path}`))

    if (sitemap) output.push(`Sitemap: ${sitemap}`)

    if (output.length) {
      const writeStream = createWriteStream(join(outDir, filename))

      output.map(line => writeStream.write(`${line}\n`))

      writeStream.end()
    }
  }

  if (typeof nextConfig.exportPathMap === 'function') {
    return nextConfig.exportPathMap(...args)
  }

  return defaultPathMap
}
