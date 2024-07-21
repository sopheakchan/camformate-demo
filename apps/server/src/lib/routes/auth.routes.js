const express = require('express')
const router = express.Router()
const Middleware = require('../middlewares/middlewares')
const UserController = require('../controllers/users.controller')
const ErrorHandler = require('../helper/ErrorHandler')

router
  .route('/register')
  .post(Middleware.bodyValidator, ErrorHandler(UserController.createUser))

router
  .route('/login')
  .post(
    Middleware.bodyValidator,
    ErrorHandler(UserController.loginWithValidateEmail),
  )

module.exports = router
