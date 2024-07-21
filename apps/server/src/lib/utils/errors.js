const statusCode = {
  BadRequest: 400,
  NotFound: 404,
  ServerError: 500,
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.status = statusCode.BadRequest
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.status = statusCode.NotFound
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message)
    this.status = statusCode.ServerError
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  ServerError,
}
