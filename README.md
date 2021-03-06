> **DEPRECATED: No longer supported. Please use [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) instead.**

# next-plugin-robots [![NPM version](https://img.shields.io/npm/v/@newhighsco/next-plugin-robots.svg)](https://www.npmjs.com/package/@newhighsco/next-plugin-robots)

[Next.js](https://nextjs.org/) plugin for generating a robots.txt during `next export`

## Installation

Install Next.js and `@newhighsco/next-plugin-robots`:

```
npm install --save next @newhighsco/next-plugin-robots
```

## Usage

Create a `next.config.js` in your project:

```js
// next.config.js
const withRobots = require('@newhighsco/next-plugin-robots')
module.exports = withRobots({
  robots: {
    /* config options here */
  }
})
```

## Options

|Name|Type|Default|
|-|-|-|
|`userAgent*`|`string`|`*`|
|`allowPaths?`|`array`|-|
|`disallowPaths?`|`array`|-|
|`filename?`|`string`|`robots.txt`|
|`sitemap?`|`object`|[See @newhighsco/next-plugin-sitemap options](https://github.com/newhighsco/next-plugin-sitemap#options)|

## [CHANGELOG](CHANGELOG.md)
