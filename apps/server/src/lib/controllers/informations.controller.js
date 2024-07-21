const Informations = require('../models/informations.model')
const ApiFeature = require('../utils/ApiFeature')
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require('./../utils/errors')
const asyncHandler = require('./../utils/asyncHandler')
const errorHandler = require('./../utils/asyncHandler')
class InformationController {
  //get informations
  getInformations = errorHandler(async (req, res, next) => {
    const features = new ApiFeature(Informations, req.query)
      .filter(['school_name', 'location','subject'])
      .paginate()

    const informations = await features.model
    if (informations.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Information resource is not found',
      })
    }
    const countInfo = await Informations.countDocuments()
    res.status(200).json({
      status: 'Success',
      total: countInfo,
      results: informations.length,
      data: informations,
    })
  })

  // get single information
  getInformation = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const information = await Informations.findById(id)

    if (!information) {
      return next(new NotFoundError(`Scholarship not found for ID: ${id}`))
    }
    res.status(200).json({
      status: 'Success',
      data: information,
    })
  })

  // create information
  createInformation = asyncHandler(async (req, res) => {
    console.log(req.body)
    const information = await Informations.create(req.body)
    res.status(201).json({
      status: 'Successfully Created',
      
    })
  })

  // update information
  updateInformation = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const information = req.body
    console.log(req.body)
    const infomationUpdated = await Informations.findByIdAndUpdate(
      id,
      information,
      {
        new: true,
        runValidators: true,
      },
    )
    if (!infomationUpdated) {
      return next(new NotFoundError(`Information not found for ID: ${id}`))
    }
    res.status(200).json({
      status: 'Successfully Updated',
    })
  })

  // delete information
  deleteInformation = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    const informationDelete = await Informations.findByIdAndRemove(id)
    console.log(informationDelete)
    if (!informationDelete) {
      return next(new NotFoundError(`Information not found for ID: ${id}`))
    }
    res.status(200).json({
      status: 'Successfully Deleted',
    })
  })
}

module.exports = new InformationController()
