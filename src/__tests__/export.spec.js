import { createWriteStream } from 'fs'
import exportRobots from '../export'

jest.mock('fs', () => {
  const writeStream = { write: jest.fn(), end: jest.fn() }
  const createWriteStream = jest.fn(() => writeStream)
  createWriteStream.writeStream = writeStream

  return {
    createWriteStream
  }
})

const defaultPathMap = { foo: {}, bar: {} }
const exportPathMap = jest.fn(() => ({ fizz: {}, buzz: {} }))
const options = {
  dev: true,
  outDir: 'out'
}
const robots = {
  filename: 'robots.txt',
  userAgent: '*'
}

describe('exportRobots', () => {
  it('should return defaultPathMap', async () => {
    const exporter = exportRobots()
    const pathMap = await exporter(defaultPathMap, options)

    expect(pathMap).toEqual({ foo: {}, bar: {} })
    expect(createWriteStream).not.toBeCalled()
  })

  it('should not generate robots.txt if no output is generated', async () => {
    const nextConfig = {
      robots: {
        ...robots,
        userAgent: undefined
      }
    }

    const exporter = exportRobots(nextConfig)
    const pathMap = await exporter(defaultPathMap, {
      ...options,
      dev: false
    })

    expect(pathMap).toEqual({ foo: {}, bar: {} })
    expect(createWriteStream).not.toBeCalled()
  })

  it('should generate robots.txt', async () => {
    const nextConfig = {
      robots: {
        ...robots,
        sitemap: 'https://test.com/sitemap.xml',
        allowPaths: ['foo', 'bar'],
        disallowPaths: ['fizz', 'buzz']
      },
      exportPathMap
    }

    const exporter = exportRobots(nextConfig)

    const pathMap = await exporter(defaultPathMap, {
      ...options,
      dev: false
    })

    expect(pathMap).toEqual({ fizz: {}, buzz: {} })
    expect(createWriteStream).toBeCalledWith('out/robots.txt')
    expect(createWriteStream.writeStream.write).toHaveBeenCalledTimes(6)
    expect(createWriteStream.writeStream.write.mock.calls[0]).toEqual([
      'User-agent: *\n'
    ])
    expect(createWriteStream.writeStream.write.mock.calls[1]).toEqual([
      'Allow: foo\n'
    ])
    expect(createWriteStream.writeStream.write.mock.calls[2]).toEqual([
      'Allow: bar\n'
    ])
    expect(createWriteStream.writeStream.write.mock.calls[3]).toEqual([
      'Disallow: fizz\n'
    ])
    expect(createWriteStream.writeStream.write.mock.calls[4]).toEqual([
      'Disallow: buzz\n'
    ])
    expect(createWriteStream.writeStream.write.mock.calls[5]).toEqual([
      'Sitemap: https://test.com/sitemap.xml\n'
    ])
    expect(nextConfig.exportPathMap).toBeCalledWith(defaultPathMap, {
      ...options,
      dev: false
    })
  })
})
