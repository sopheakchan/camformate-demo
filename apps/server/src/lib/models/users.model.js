const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  uid: {
    type: String,
    required: [true, 'UID is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  image: {
    type: String,
    default: 'none',
  },
  representation: {
    type: String,
    default: 'none',
  },
  contacts: [
    {
      phone_number: {
        type: String,
      },
    },
  ],
  favorites: [
    {
      type: {
        type: String,
        enum: ['scholarships', 'jobs'],
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'favorites.type',
        required: true,
      },
    },
  ],
  cv_url: {
    type: String,
  },
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
