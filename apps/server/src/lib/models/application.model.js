const mongoose = require('mongoose')

const applicatonSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'User ID is required'],
  },
  announcement: {
    type: {
      type: String,
      enum: ['jobs', 'scholarships'],
      required: true,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'announcement.type',
      required: [true, 'Announcement ID is required'],
    },
  },
  applied_date: {
    type: Date,
    default: Date.now,
  },
})

const Applications = mongoose.model('applications', applicatonSchema)

module.exports = Applications
