const express = require('express')
const multer = require('multer')

const router = express.Router()
const bodyValidator = require('./../middlewares/bodyValidator')
const scholarshipJoiSchema = require('../validators/scholarshipJoiSchema')
const ScholarshipController = require('../controllers/scholarships.controller')

// for uploading image
const { upload } = require('../../lib/middlewares/multerStorage')
const cloudinaryUpload = require('../../lib/middlewares/cloudinaryUpload')
const Middleware = require('../middlewares/middlewares')
const {
  parseJobBody,
  parseScholarshipBody,
} = require('../middlewares/parseBody')
const { editScholarshipImage } = require('../middlewares/destroyJobImage')

// const upload = multer({ dest: 'uploads/' })

router.route('/').get(ScholarshipController.getScholarships).post(
  // bodyValidator(scholarshipJoiSchema),
  Middleware.tokenVerifier,
  upload,
  cloudinaryUpload,
  ScholarshipController.createScholarship,
)

router
  .route('/:id')
  .get(ScholarshipController.getScholarship)
  .delete(Middleware.tokenVerifier, ScholarshipController.deleteScholarship)
  .put(
    Middleware.tokenVerifier,
    upload,
    cloudinaryUpload,
    editScholarshipImage,
    parseScholarshipBody,
    // bodyValidator(scholarshipJoiSchema),
    ScholarshipController.updateScholarship,
  )

module.exports = router
