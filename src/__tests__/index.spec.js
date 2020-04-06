import withRobots from '../index'

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
        userAgent: 'googlebot',
        allowPaths: ['foo', 'bar'],
        disallowPaths: ['fizz', 'buzz'],
        filename: 'overridden.txt'
      }
    })

    expect(nextConfig.robots.userAgent).toEqual('googlebot')
    expect(nextConfig.robots.filename).toEqual('overridden.txt')
  })
})
