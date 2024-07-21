const Joi = require('joi')

const scholarshipJoiSchema = Joi.object({
  scholarship_name: Joi.string().required().messages({
    'any.required': 'Scholarship name is required',
  }),
  description: Joi.string().empty(''),
  school_name: Joi.string().required().messages({
    'any.required': 'School Name is required',
  }),
  location: Joi.string().required().messages({
    'any.required': 'Location is required',
  }),
  prize: Joi.object({
    amount: Joi.number().required().messages({
      'any.required': 'Amount is required',
    }),
    type: Joi.string().valid('dollars', 'percents').required().messages({
      'any.required': 'Type is required',
      'any.only': 'Please select an option for type',
    }),
  }),
  majors: Joi.string().required().messages({
    'any.required': 'Majors is required',
  }),
  colleges: Joi.string().required().messages({
    'any.required': 'Colleges is required',
  }),
  imageUrl: Joi.string(),
  upload_date: Joi.date().default(Date.now),
  deadline: Joi.date().required().messages({
    'any.required': 'End date is required',
  }),
  requirements: Joi.array().items(
    Joi.object({
      requirement: Joi.string().required().messages({
        'any.required': 'Requirement is required',
      }),
    }),
  ),
  benefits: Joi.array().items(
    Joi.object({
      benefit: Joi.string().required().messages({
        'any.required': 'Benefit is required',
      }),
    }),
  ),
})

module.exports = scholarshipJoiSchema
