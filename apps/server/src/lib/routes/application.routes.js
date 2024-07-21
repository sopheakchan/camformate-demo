const express = require('express')
const router = express.Router()
const ApplicationController = require('../controllers/applications.controller')

// global error handler
const ErrorHandler = require('../helper/ErrorHandler')

// middlewares
const Middleware = require('../middlewares/middlewares')

router
  .route('/')
  .post(Middleware.tokenVerifier, ErrorHandler(ApplicationController.apply))

module.exports = router
