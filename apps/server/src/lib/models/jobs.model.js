const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company Name is required'],
  },
  imageUrl: {
    type: String,
  },
  job_name: {
    type: String,
    required: [true, 'Job Name is required'],
  },
  job_category: {
    type: String,
    required: [true, 'Job Category is required'],
    enum: [
      'Others',
      'Textile and Garment',
      'Agriculture and Agro-Processing',
      'Tourism and Hospitality',
      'Management',
      'Design',
      'Customer Service',
      'Construction',
      'Manufacturing',
      'Banking and Finance',
      'Information Technology (IT)',
      'Education',
      'Healthcare',
      'Mining and Energy',
    ],
  },
  salary: {
    type: String,
    required: [true, 'Salary is required'],
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  description: {
    type: String,
  },
  slots: {
    type: Number,
    required: [true, 'Slots is required'],
  },
  schedule: {
    type: String,
    required: true,
    enum: {
      values: ['Part Time', 'Full Time', 'Flexible'],
      message: 'Schedule is required',
    },
  },
  work_type: {
    type: String,
    required: true,
    enum: {
      values: ['Remote', 'On Site', 'Flexible', 'Internship'],
      message: 'Work type is required',
    },
  },
  requirements: [
    {
      // requirement_id: {
      //   type: String,
      //   required: [true, 'Requirement ID is required'],
      // },
      requirement: {
        type: String,
        required: [true, 'Requirement is required'],
      },
    },
  ],
  benefits: [
    {
      // benefit_id: {
      //   type: String,
      //   required: [true, 'Benefit ID is required'],
      // },
      benefit: {
        type: String,
        required: [true, 'Benefit is required'],
      },
    },
  ],
  user_contacts: [
    {
      contact: {
        type: String,
        required: [true, 'Contact is required'],
      },
    },
  ],
  gmail: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    // required: [true, 'User ID is required'],
  },
  user_profile: {
    type: String,
  },
})

const Jobs = mongoose.model('jobs', jobSchema)

module.exports = Jobs
