// model import
const Jobs = require('../models/jobs.model')
const Users = require('../models/users.model')
const ApiFeatures = require('../utils/ApiFeatures')
const mongoose = require('mongoose')
// error import
const errorHandler = require('./../utils/asyncHandler')
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require('./../utils/errors')

// class controller
class JobController {
  //get all job => not protected

  getJobs = errorHandler(async (req, res, next) => {
    const features = new ApiFeatures(Jobs, req.query)
      .filter(['location', 'job_name', 'work_type', 'schedule', 'company'])
      .sort()
      .limitFields()
      .paginate()

    const jobs = await features.model

    const totalJobs = await Jobs.countDocuments()

    res.status(200).json({
      status: 'Success',
      results: jobs.length,
      data: jobs,
      total: totalJobs,
    })
  })

  //get single job by id => not protected
  getJob = errorHandler(async (req, res, next) => {
    const id = req.params.id
    const job = await Jobs.findById({ _id: id })

    if (!job) {
      return next(new NotFoundError(`Job not found for ID: ${id}`))
    }

    res.status(200).json({
      success: true,
      data: job,
    })
  })

  //create new scholarship => protected
  // createJob = errorHandler(async (req, res, next) => {
  //   const user_id = req.header('user_id')
  //   const job = new Jobs({ ...req.body, user_id })

  //   await job.save()

  //   res.status(201).json({
  //     success: true,
  //     message: 'Job created successfully!',
  //     data: job,
  //   })
  // })

  //create new scholarship => protected
  createJob = errorHandler(async (req, res, next) => {
    const data = req.body // name, datae, locatoi
    const file = req.imageUrl

    // get user profile
    const userProfile = await Users.findOne({ uid: req.user })
    // Create an object which clombine both var above
    const doc = Object.assign(
      data,
      { user_id: req.user },
      userProfile && {
        user_profile: userProfile.image ? userProfile.image : '',
      },
      { imageUrl: file },
    )

    // Save dat to database
    const job = new Jobs(doc)

    await job.save()

    res.status(201).json({
      success: true,
      message: 'Job created successfully!',
      data: job,
    })
  })

  //delete scholarship => protected
  deleteJob = errorHandler(async (req, res, next) => {
    const user_id = req.user
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError(`Job ID is not valid`))
    }

    const job = await Jobs.findOneAndDelete({
      _id: id,
      user_id,
    })

    if (!job) {
      return next(new NotFoundError(`:Job not found for ID: ${id}`))
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    })
  })

  //update scholarship => protected
  updateJob = errorHandler(async (req, res, next) => {
    const user_id = req.user
    const id = req.params.id
    const image = req.imageUrl

    console.log('body: ', req.body)

    if (image) {
      req.body.imageUrl = image
    }

    const job = await Jobs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    })

    if (!job) {
      return next(new NotFoundError(`Job not found for ID:  ${id}`))
    }

    res.status(200).json({
      status: 'success',
      message: 'Update Successfully!',
      data: job,
    })
  })
}

// exports object
module.exports = new JobController()
