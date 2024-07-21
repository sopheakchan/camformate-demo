const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
  school_name: {
    type: String,
    required: [true, 'School Name is required'],
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  major_description: {
    type: String,
    required: true,
  },

  faculties: [
    {
      faculty_name: {
        type: String,
        required: [true, 'Faculty Name is required'],
      },
      subjects: [
        {
          subject_name: {
            type: String,
            required: true,
          },

          prices: [
            {
              year: {
                type: String,
                required: true,
              },
              price: {
                type: Number,
                required: true,
              },
            },
          ],
          image: {
            type: [String],
          },
        },
      ],
    },
  ],
})

const Informations = mongoose.model('informations', infoSchema)

module.exports = Informations
