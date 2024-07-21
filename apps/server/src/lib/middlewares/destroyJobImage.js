const { CLOUDINARY } = require('../config')
const { FetchDataById } = require('../helper/DataFetching')
const JobModel = require('../models/jobs.model')
const ScholarshipModel = require('../models/scholarships.model')
const UserModel = require('../models/users.model')

const destroyJobImage = async (req, res, next) => {
  const data = await FetchDataById(JobModel, req.params.id)

  const public_id = data?.imageUrl
    .split('/')
    [data?.imageUrl.split('/').length - 1].split('.')[0]

  CLOUDINARY.uploader.destroy(public_id, (error, result) => {
    if (error) throw new Error(error)
    return next()
  })
}

const editJobImage = async (req, res, next) => {
  if (req.file) {
    const data = await FetchDataById(JobModel, req.params.id)

    const public_id = data?.imageUrl
      .split('/')
      [data?.imageUrl.split('/').length - 1].split('.')[0]

    CLOUDINARY.uploader.destroy(public_id, (error, result) => {
      if (error) throw new Error(error)
      return next()
    })
  } else return next()
}

const editScholarshipImage = async (req, res, next) => {
  if (req.file) {
    const data = await FetchDataById(ScholarshipModel, req.params.id)

    const public_id = data?.image_url
      .split('/')
      [data?.image_url.split('/').length - 1].split('.')[0]

    CLOUDINARY.uploader.destroy(public_id, (error, result) => {
      if (error) throw new Error(error)
      return next()
    })
  } else return next()
}

const editCV = async (req, res, next) => {
  if (req.file) {
    const data = await UserModel.findOne({ uid: req.params.uid })

    const public_id =
      'CVs/' + data.cv_url.split('/')[data.cv_url.split('/').length - 1]

    CLOUDINARY.uploader.destroy(
      public_id,
      { resource_type: 'raw' },
      (error, result) => {
        if (error) throw new Error(error)
        return next()
      },
    )
  } else return next()
}

module.exports = { destroyJobImage, editJobImage, editScholarshipImage, editCV }
