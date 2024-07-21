const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users.controller')
const ErrorHandler = require('../helper/ErrorHandler')
const Middleware = require('../middlewares/middlewares')

// for uploading image
const { upload, uploadCV } = require('../../lib/middlewares/multerStorage')
const cloudinaryUpload = require('../../lib/middlewares/cloudinaryUpload')
const cloudinaryDestroy = require('../../lib/middlewares/cloudinaryDestroy')
const cloudinaryUploadCV = require('../middlewares/cloudinaryUploadCV')
const { editCV } = require('../middlewares/destroyJobImage')

router
  .route('/')
  .get(Middleware.tokenVerifier, ErrorHandler(UserController.getUsers))
  .post(Middleware.bodyValidator, ErrorHandler(UserController.createUser))

router
  .route('/:id')
  .get(Middleware.paramValidator, ErrorHandler(UserController.getSingleUser))
  .put(
    Middleware.paramValidator,
    Middleware.bodyValidator,
    ErrorHandler(UserController.updateUser),
  )
  .patch(
    Middleware.tokenVerifier,
    Middleware.paramValidator,
    upload,
    cloudinaryUpload,
    cloudinaryDestroy,
    ErrorHandler(UserController.changeProfile),
  )
  .delete(
    Middleware.paramValidator,
    ErrorHandler(UserController.deactivateUser),
  )

// scholarships

router
  .route('/:uid/scholarships')
  .get(
    Middleware.paramValidator,
    ErrorHandler(UserController.getRelatedScholarships),
  )

// job

router
  .route('/:uid/jobs')
  .get(Middleware.paramValidator, ErrorHandler(UserController.getRelatedJobs))

// favorite
router
  .route('/:uid/favorites')
  .get(Middleware.tokenVerifier, ErrorHandler(UserController.getFavorites))
  .post(
    Middleware.tokenVerifier,
    ErrorHandler(UserController.addToFavoritesHandler),
  )
  .delete(
    Middleware.tokenVerifier,
    ErrorHandler(UserController.removeFromFavoritesHandler),
  )

// cv

router
  .route('/:uid/cv')
  .get(Middleware.tokenVerifier, ErrorHandler(UserController.getCV))
  .post(
    Middleware.tokenVerifier,
    uploadCV,
    cloudinaryUploadCV,
    ErrorHandler(UserController.uploadCV),
  )
  .put(
    Middleware.tokenVerifier,
    uploadCV,
    cloudinaryUploadCV,
    editCV,
    ErrorHandler(UserController.updateCV),
  )

module.exports = router
