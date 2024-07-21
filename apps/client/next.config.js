const withTM = require('next-transpile-modules')(['ui'])

module.exports = withTM({
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'],
  },
})
