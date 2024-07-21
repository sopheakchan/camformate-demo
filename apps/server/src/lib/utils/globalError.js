const globalErr = (error, req, res, next) => {
  res.status(error.status).json({
    success: false,
    status: 'Failed!',
    message: error.message,
  })
}

module.exports = globalErr
