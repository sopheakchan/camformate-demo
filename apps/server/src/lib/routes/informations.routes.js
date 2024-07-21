const express = require('express')
const router = express.Router()
const InformationController = require('../controllers/informations.controller')
const bodyValidator = require('./../middlewares/bodyValidator')
const informationJoiSchema = require('../validators/informationJoiShema')


router
  .route('/')
  .get(InformationController.getInformations)
  .post(
    bodyValidator(informationJoiSchema),
    InformationController.createInformation,
  )

router
  .route('/:id')
  .get(InformationController.getInformation)
  .delete(InformationController.deleteInformation)
  .patch(InformationController.updateInformation)

module.exports = router
