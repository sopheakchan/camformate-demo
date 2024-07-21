const UserModel = require('../models/users.model')
const JobModel = require('../models/jobs.model')
const ScholarshipModel = require('../models/scholarships.model')
const { BadRequestError, NotFoundError } = require('../helper/ErrorMessages')
const ApiFeatures = require('../helper/ApiFeature')
const buildUrl = require('../helper/BuildUrl')
const {
  FetchDataByIdAndUpdate,
  FetchDataByIdAndDelete,
  FetchUserByUid,
  userScholarships,
  userJobs,
} = require('../helper/DataFetching')
const Serializer = require('../utils/Serializer')
const mongoose = require('mongoose')

class User {
  async getUsers(req, res, next) {
    try {
      // sort,pagination,limit features
      const users = new ApiFeatures(UserModel, req.query)
        .filter(['username'])
        .sort()
        .limitFields()
        .paginate()

      let docs = await users.model
      const userCount = await UserModel.countDocuments()
      const queryOptions = await users.model.options

      // get limit per page
      const limitPerPage = queryOptions.limit

      // get current page
      const page = queryOptions.skip / limitPerPage + 1

      // Has Next and Previous Page
      const currentUrl = new URL(
        req.protocol + '://' + req.get('host') + req.originalUrl,
      )

      //next page
      const hasNextPage =
        limitPerPage * page < userCount
          ? buildUrl(currentUrl, { 'page[offset]': page + 1 })
          : null

      //previous page
      const hasPreviousPage =
        queryOptions.skip / limitPerPage + 1 > 1
          ? buildUrl(currentUrl, { 'page[offset]': page - 1 })
          : null

      // last page
      const hasLastPage = buildUrl(currentUrl, {
        'page[offset]': userCount / limitPerPage,
      })

      const links = {
        self: currentUrl,
        next: hasNextPage,
        previous: hasPreviousPage,
        last: hasLastPage,
      }

      // JSON API
      docs = Serializer.user(docs, links)

      res.status(200).json({
        status: 'Success',
        result: docs.data.length,
        ...docs,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async createUser(req, res) {
    try {
      // create new user in db
      const user = await UserModel.create(req.body)
      res.status(201).json({
        status: 'Success',
        message: 'Successfully Created',
        data: user,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async getSingleUser(req, res) {
    const id = req.params.id

    let user = await FetchUserByUid(UserModel, id)

    // current url
    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl,
    )

    const link = {
      self: currentUrl,
    }

    user = Serializer.user(user, link)

    res.status(200).json({
      status: 'Success',
      ...user,
    })
  }

  async updateUser(req, res, next) {
    const id = req.params.id
    const data = req.body
    let user = await FetchDataByIdAndUpdate(UserModel, id, data)

    // current url
    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl,
    )

    const link = {
      self: currentUrl,
    }

    // JSON API
    user = Serializer.user(user, link)

    res.status(200).json({
      status: 'Success',
      message: 'Successfully Updated',
      // data: user,
      ...user,
    })
  }

  // favorites
  async getFavorites(req, res) {
    const user_id = req.user
    const type = req.body.type

    const favorites = await UserModel.findOne({ uid: user_id })
      .populate({ path: 'favorites.id', model: type })
      .exec()

    if (!favorites) {
      throw new NotFoundError('No Favorites')
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Fetch Successfully',
      result: favorites.favorites.length,
      favorites: favorites.favorites,
    })
  }

  async addToFavoritesHandler(req, res) {
    const user_id = req.user
    const { _id, type } = req.body

    // Update the user's record in the database

    UserModel.findOneAndUpdate(
      { uid: user_id, 'favorites.id': { $ne: mongoose.Types.ObjectId(_id) } },
      {
        $addToSet: {
          favorites: { type: type, id: mongoose.Types.ObjectId(_id) },
        },
        // $pull: { favorites: { type: type, id: mongoose.Types.ObjectId(_id) } },
      },
      { new: true },
    )
      .then(user => {
        if (user) {
          res.status(200).json({ message: 'Favorite added successfully', user })
        } else {
          res
            .status(400)
            .json({ message: 'Favorite already added successfully' })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ message: 'Error adding favorite' })
      })
  }

  async removeFromFavoritesHandler(req, res) {
    const user_id = req.user
    const { _id, type } = req.body

    // Update the user's record in the database

    UserModel.findOneAndUpdate(
      { uid: user_id, 'favorites.id': mongoose.Types.ObjectId(_id) },
      {
        $pull: { favorites: { type: type, id: mongoose.Types.ObjectId(_id) } },
      },
      { new: true },
    )
      .then(user => {
        if (user) {
          res
            .status(200)
            .json({ message: 'Favorite removed successfully', user })
        } else {
          res.status(400).json({ message: 'Favorite not found' })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ message: 'Error removing favorite' })
      })
  }

  async deactivateUser(req, res, next) {
    const id = req.params.id

    await FetchDataByIdAndDelete(UserModel, id)
    res.status(204).send()
  }

  async changeProfile(req, res, next) {
    const id = req.params.id
    const image = req.imageUrl

    // check if id is not a ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`${id} is not a valid ID`)
    }

    // fetch user with id
    let user = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          image: image,
        },
      },
      {
        new: true,
      },
    )

    await JobModel.updateMany(
      { user_id: user.uid },
      { $set: { user_profile: image } },
      { multi: true },
    )

    await ScholarshipModel.updateMany(
      { user_id: user.uid },
      { $set: { user_profile: image } },
      { multi: true },
    )

    // user is not found
    if (!user) {
      throw new NotFoundError(`User ${id} is not found`)
    }

    // current url
    const currentUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl,
    )

    const link = {
      self: currentUrl,
    }

    user = Serializer.user(user, link)

    return res.status(200).json({
      status: 'Success',
      message: 'Successfully Updated',
      ...user,
    })
  }

  async getRelatedScholarships(req, res, next) {
    const uid = req.params.uid
    let scholarships = await userScholarships(uid)
    scholarships = await Serializer.scholarship(scholarships)

    res.status(200).json({
      status: 'Success',
      message: 'Successfully Fetched',
      results: scholarships.length,
      scholarships,
    })
  }

  async getRelatedJobs(req, res, next) {
    const uid = req.params.uid
    const jobs = await userJobs(uid)

    res.status(200).json({
      status: 'Success',
      message: 'Successfully Fetched',
      results: jobs.length,
      jobs,
    })
  }

  async getCV(req, res) {
    const user_id = req.user

    const cv = await UserModel.findOne({ uid: user_id }).select('cv_url')

    if (!cv) {
      throw new NotFoundError("You don't have CV yet.")
    }

    res.status(200).json({
      status: 'Success',
      message: 'Fetched Successfully',
      data: cv,
    })
  }

  async uploadCV(req, res) {
    const user_id = req.user
    const cv_url = req.cvUrl

    const user = await UserModel.findOneAndUpdate(
      { uid: user_id },
      {
        $set: { cv_url: cv_url },
      },
      { new: true },
    )

    if (!user) {
      throw new NotFoundError('User not found')
    }

    res.status(201).json({
      status: 'Success',
      message: 'Uploaded Successfully',
      data: cv_url,
    })
  }

  async updateCV(req, res) {
    const user_id = req.user
    const cv_url = req.cvUrl

    const user = await UserModel.findOneAndUpdate(
      { uid: user_id },
      {
        $set: { cv_url: cv_url },
      },
      { new: true },
    )

    if (!user) {
      throw new NotFoundError('User is not found')
    }

    res.status(200).json({
      status: 'Success',
      message: 'Updated Successfully',
      data: cv_url,
    })
  }
}

module.exports = new User()
