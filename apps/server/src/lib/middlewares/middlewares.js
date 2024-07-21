const {
  BadRequestError,
  UnauthorizedError,
} = require('../helper/ErrorMessages')

const admin = require('../utils/Firebase')
class Middleware {
  // to validate req.body
  bodyValidator(req, res, next) {
    if (!req.body) {
      return next(new BadRequestError('Invalid Body'))
    }
    next()
  }

  // to validate req.params
  paramValidator(req, res, next) {
    if (!req.params) {
      return next(new BadRequestError('Invalid Parameter'))
    }
    next()
  }

  // to verity token
  async tokenVerifier(req, res, next) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return next(
        new UnauthorizedError('You are not login! Please login to get started'),
      )
    }

    try {
      const idToken = req.headers.authorization.split('Bearer ')[1]
      const decodedIdToken = await admin.auth().verifyIdToken(idToken)
      req.user = decodedIdToken.uid
      next()
    } catch (error) {
      return next(new UnauthorizedError(error.message))
    }
  }
}

module.exports = new Middleware()
