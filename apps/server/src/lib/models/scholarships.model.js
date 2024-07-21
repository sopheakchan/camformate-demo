const mongoose = require('mongoose')

const scholarshipSchema = new mongoose.Schema({
  scholarship_name: {
    type: String,
    required: [true, 'Scholarship name is required'],
  },
  description: {
    type: String,
  },
  school_name: {
    type: String,
    required: [true, 'School Name is required'],
  },
  major: {
    type: String,
    required: [true, 'Majors is required'],
  },
  faculty: {
    type: String,
    required: [true, 'Colleges is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    type: {
      type: String,
      required: true,
    },
  },
  image_url: {
    type: String,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: [true, 'End date is required'],
  },
  requirements: [
    {
      requirement: {
        type: String,
        required: [true, 'Requirement is required'],
      },
    },
  ],
  benefits: [
    {
      benefit: {
        type: String,
        required: [true, 'Benefit is required'],
      },
    },
  ],
  slot: {
    type: Number,
  },
  phone_number: {
    type: Array,
  },
  email: {
    type: String,
  },

  user_id: {
    type: String,
    required: [true, 'User id is required'],
    ref: 'User',
  },
  user_profile: {
    type: String,
    required: [true, 'User profile is required'],
  },
})

const Scholarship = mongoose.model('scholarships', scholarshipSchema)

module.exports = Scholarship
