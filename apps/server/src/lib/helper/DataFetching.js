const { BadRequestError, NotFoundError } = require('./ErrorMessages')
const mongoose = require('mongoose')
const UserModel = require('../models/users.model')
const ScholarshipModel = require('../models/scholarships.model')
const JobModel = require('../models/jobs.model')

const FetchDataById = async (model, id) => {
  // check if id is not a ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`${id} is not a valid ID`)
  }

  // fetch data with id
  let data = await model.findById(id)

  // if data is not found
  if (!data) {
    throw new NotFoundError(`${id} is not found`)
  }

  return data
}

const FetchDataByIdAndUpdate = async (model, id, data) => {
  // check if id is not a ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`${id} is not a valid ID`)
  }

  // fetch user with id
  let user = await model.findByIdAndUpdate(id, data)

  // user is not found
  if (!user) {
    throw new NotFoundError(`User ${id} is not found`)
  }

  return user
}

const FetchDataByIdAndDelete = async (model, id) => {
  // check if id is not a ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`${id} is not a valid ID`)
  }

  // fetch user with id
  let user = await model.findByIdAndDelete(id)

  // data is not found
  if (!user) {
    throw new NotFoundError(`User ${id} is not found`)
  }

  return user
}

const FetchUserByUid = async (model, uid) => {
  let user = await model.findOne({ uid: uid })
  if (!user) {
    throw new NotFoundError(`User ${uid} is not found`)
  }

  return user
}

const userScholarships = async uid => {
  const user = await UserModel.findOne({ uid: uid })

  if (!user) {
    throw new NotFoundError(`User ${uid} is not found`)
  }

  const scholarships = await ScholarshipModel.find({ user_id: uid })

  if (scholarships.length <= 0) {
    throw new BadRequestError(
      `User ${uid} does not have any scholarship announcement`,
    )
  }

  return scholarships
}

const userJobs = async uid => {
  const user = await UserModel.findOne({ uid: uid })

  if (!user) {
    throw new NotFoundError(`User ${uid} is not found`)
  }

  const jobs = await JobModel.find({ user_id: uid })

  if (jobs.length <= 0) {
    throw new BadRequestError(`User ${uid} does not have any job announcements`)
  }

  return jobs
}

module.exports = {
  FetchDataById,
  FetchDataByIdAndUpdate,
  FetchDataByIdAndDelete,
  FetchUserByUid,
  userScholarships,
  userJobs,
}
