const JSONAPISerializer = require('jsonapi-serializer').Serializer
// model import
const Scholarship = require('../models/scholarships.model')
const User = require('../models/users.model')
const numbericFeatures = require('../utils/numbericFeature')

// error import
const errorHandler = require('./../utils/asyncHandler')
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require('./../utils/errors')

const userSerializer = (scholarships, links) => {
  return new JSONAPISerializer('scholarships', {
    id: '_id',
    attributes: [
      'scholarship_name',
      'description',
      'location',
      'majors',
      'school_name',
      'colleges',
      'price',
      'image_url',
      'upload_date',
      'deadline',
      'requirements',
      'benefits',
      'user_id',
      'phone_number',
      'email',
      'web',
      'slot',
      'user_profile',
    ],
    keyForAttribute: 'underscore_case',
    topLevelLinks: {
      self: links?.self || '',
      next: links?.next || '',
      last: links?.last || '',
    },
    typeForAttribute: () => {
      return 'scholarship'
    },
    user_id: {
      ref: 'user_id',
      included: true,
      attributes: ['user_id'],
    },
  }).serialize(scholarships)
}

// class controller
class ScholarshipController {
  //get all scholarship => not protected
  getScholarships = errorHandler(async (req, res, next) => {
    const { scholarship_name, location, sort, fields, type, numberic } =
      req.query
    const queryObject = {}

    if (scholarship_name) {
      queryObject.scholarship_name = { $regex: scholarship_name, $options: 'i' }
    }

    if (location) {
      queryObject.location = { $regex: location, $options: 'i' }
    }

    if (type) {
      console.log(type)
      queryObject['prize.type'] = { $regex: type, $options: 'i' }
    }

    if (numberic) {
      Object.assign(queryObject, numbericFeatures(numberic))
      // console.log(queryObject)
    }

    let scholarships = Scholarship.find(queryObject)

    if (sort) {
      const sortList = sort.split(',').join(' ')
      scholarships = scholarships.sort(sortList)
    } else {
      scholarships = scholarships.sort('-deadline')
    }

    if (fields) {
      const fieldsList = fields.split(',').join(' ')
      scholarships = scholarships.select(fieldsList)
    }

    const pagination = Number(req.query.pagination) || 1

    console.log(pagination)

    const limit = Number(req.query.limit) || 10
    const skip = (pagination - 1) * limit

    scholarships = scholarships.limit(limit).skip(skip)

    scholarships = await scholarships

    scholarships = userSerializer(scholarships)

    res.status(200).json(scholarships)
  })

  //get single scholarship by id => not protected
  getScholarship = errorHandler(async (req, res, next) => {
    const id = req.params.id
    const scholarship = await Scholarship.findById({ _id: id })

    if (!scholarship) {
      return next(new NotFoundError(`Scholarship not found for ID: ${id}`))
    }

    res.status(200).json({
      status: 'Success',
      success: true,
      data: scholarship,
    })
  })

  //create new scholarship => protected
  createScholarship = errorHandler(async (req, res, next) => {
    const data = JSON.parse(req.body.data)
    const uid = req.user

    const relatedUser = await User.findOne({ uid: uid })

    const new_data = {}

    new_data.image_url = req.imageUrl
    new_data.scholarship_name = data.name
    new_data.school_name = data.schoolName
    new_data.location = data.address
    new_data.deadline = data.deadline
    new_data.major = data.majors || 'All Major'
    new_data.faculty = data.faculty || 'All faculty are available'
    new_data.price = {
      amount: data.rewardAmount,
      type: data.rewardType,
    }
    new_data.requirements = data.require.map(i => {
      return { requirement: i.requirement }
    })
    new_data.benefits = data.benefit.map(i => {
      return { benefit: i.benefit }
    })
    new_data.phone_number = data.phone.map(i => i.value)
    new_data.email = data.email
    new_data.web = data.web
    new_data.description = data.des
    new_data.slot = data.slot
    new_data.user_id = uid // process the request and send the response
    new_data.user_profile = relatedUser?.image ? relatedUser?.image : ''

    console.log(new_data)

    const scholarship = new Scholarship({ ...new_data })
    await scholarship.save()

    return res.status(201).json({
      status: 'success',
      success: true,
      message: 'Scholarship created successfully!',
      data: scholarship,
    })
  })

  //delete scholarship => protected
  deleteScholarship = errorHandler(async (req, res, next) => {
    const user_id = req.user
    const id = req.params.id

    const scholarship = await Scholarship.findOneAndDelete({
      _id: id,
      user_id,
    })

    if (!scholarship) {
      return next(new NotFoundError(`Scholarship not found for ID: ${id}`))
    }

    res.status(200).json({
      status: 'success',
      success: true,
      message: 'Scholarship deleted successfully',
    })
  })

  //update scholarship => protected
  updateScholarship = errorHandler(async (req, res, next) => {
    const user_id = req.user
    const id = req.params.id
    const image = req.imageUrl

    if (image) {
      req.body.image_url = image
    }

    const scholarship = await Scholarship.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    })

    if (!scholarship) {
      return next(new NotFoundError(`Scholarship not found for ID:  ${id}`))
    }

    res.status(200).json({
      status: 'success',
      message: 'Update Successfully!',
      data: scholarship,
    })
  })
}

// exports object
module.exports = new ScholarshipController()
