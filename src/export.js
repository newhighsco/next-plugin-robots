// const { writeFile } = require('fs-extra')
const { createWriteStream } = require('fs')
const { join } = require('path')
const urlJoin = require('url-join')
const normalizeUrl = require('normalize-url')

module.exports = (nextConfig = {}) => async (...args) => {
  const { robots = {} } = nextConfig
  const [defaultPathMap, { dev, outDir }] = args

  if (!dev && robots) {
    const {
      filename,
      userAgent,
      allowPaths = [],
      disallowPaths = [],
      sitemap = {}
    } = robots
    const output = []

    if (userAgent) output.push(`User-agent: ${userAgent}`)

    allowPaths.map(path => output.push(`Allow: ${path}`))
    disallowPaths.map(path => output.push(`Disallow: ${path}`))

    if (sitemap && sitemap.hostname && sitemap.filename) {
      output.push(
        `Sitemap: ${urlJoin(normalizeUrl(sitemap.hostname), sitemap.filename)}`
      )
    }

    if (output.length) {
      const writeStream = createWriteStream(join(outDir, filename))

      output.map(line => writeStream.write(`${line}\n`))

      writeStream.end()
    }
  }

  return nextConfig.exportPathMap
    ? nextConfig.exportPathMap(...args)
    : defaultPathMap
}
