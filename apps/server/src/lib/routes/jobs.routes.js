const express = require('express')
const router = express.Router()
const bodyValidator = require('./../middlewares/bodyValidator')
const jobJoiSchema = require('../validators/jobJoiSchema')
const JobsController = require('../controllers/jobs.controller')

const Middleware = require('../middlewares/middlewares')

// for upload
const { upload } = require('../middlewares/multerStorage')
const cloudinaryUpload = require('../middlewares/cloudinaryUpload')
const {
  destroyJobImage,
  editJobImage,
} = require('../middlewares/destroyJobImage')
const { parseJobBody } = require('../middlewares/parseBody')

router
  .route('/')
  .get(JobsController.getJobs)
  // .get(JobsController.getInternships)
  .post(
    Middleware.tokenVerifier,
    upload,
    cloudinaryUpload,
    parseJobBody,
    bodyValidator(jobJoiSchema),
    JobsController.createJob,
  )

router
  .route('/:id')
  .get(JobsController.getJob)
  .delete(Middleware.tokenVerifier, destroyJobImage, JobsController.deleteJob)
  .put(
    Middleware.tokenVerifier,
    upload,
    cloudinaryUpload,
    editJobImage,
    parseJobBody,
    bodyValidator(jobJoiSchema),
    JobsController.updateJob,
  )

module.exports = router
