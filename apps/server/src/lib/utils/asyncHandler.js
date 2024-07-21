const { ServerError } = require('./errors')

const errorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    return next(new ServerError(`message: ${err.message}`))
  })
}

module.exports = errorHandler
