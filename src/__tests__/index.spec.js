import withRobots from '../index'

const robots = {
  userAgent: 'googlebot',
  allowPaths: ['foo', 'bar'],
  disallowPaths: ['fizz', 'buzz'],
  filename: 'overridden.txt'
}

describe('withRobots', () => {
  it('should return exportPathMap', () => {
    const nextConfig = withRobots()

    expect(typeof nextConfig.exportPathMap).toEqual('function')
  })

  it('should set default options', () => {
    const nextConfig = withRobots()

    expect(nextConfig.robots.userAgent).toEqual('*')
    expect(nextConfig.robots.filename).toEqual('robots.txt')
  })

  it('should override default options', () => {
    const nextConfig = withRobots({
      robots: {
        ...robots,
        sitemap: { hostname: 'https://test.com/', filename: 'sitemap.xml' }
      }
    })

    expect(nextConfig.robots.userAgent).toEqual('googlebot')
    expect(nextConfig.robots.filename).toEqual('overridden.txt')
    expect(nextConfig.robots.sitemap).toEqual({
      hostname: 'https://test.com/',
      filename: 'sitemap.xml'
    })
  })

  it('should inherit settings from @newhighsco/next-plugin-sitemap', () => {
    const nextConfig = withRobots({
      robots,
      sitemap: { hostname: 'https://inherit.com/', filename: 'inherit.xml' }
    })

    expect(nextConfig.robots.sitemap).toEqual({
      hostname: 'https://inherit.com/',
      filename: 'inherit.xml'
    })
  })
})
