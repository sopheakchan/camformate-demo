const Joi = require('joi')

const jobSchema = Joi.object({
  company: Joi.string().required().messages({
    'any.required': 'Company Name is required',
  }),
  job_name: Joi.string().required().messages({
    'any.required': 'Job Name is required',
  }),
  job_category: Joi.string()
    .valid(
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
    )
    .required()
    .messages({
      'any.required': 'Job Category is required',
      'any.only': 'Invalid Job Category value',
    }),
  imageUrl: Joi.string(),
  salary: Joi.string().required().messages({
    'any.required': 'Salary is required',
  }),
  start_date: Joi.date().default(Date.now),
  deadline: Joi.date().required().messages({
    'any.required': 'Deadline is required',
  }),
  location: Joi.string().required().messages({
    'any.required': 'Location is required',
  }),
  description: Joi.string().empty(''),
  slots: Joi.number().required().messages({
    'any.required': 'Slots is required',
  }),
  schedule: Joi.string()
    .valid('Part Time', 'Full Time', 'Flexible')
    .required()
    .messages({
      'any.required': 'Schedule is required',
      'any.only': 'Invalid Schedule value',
    }),
  work_type: Joi.string()
    .valid('Remote', 'On Site', 'Flexible', 'Internship')
    .required()
    .messages({
      'any.required': 'Work type is required',
      'any.only': 'Invalid Work type value',
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
  user_contacts: Joi.array().items(
    Joi.object({
      contact: Joi.string().required().messages({
        'any.required': 'Benefit is required',
      }),
    }),
  ),
  gmail: Joi.string().empty(''),
  website: Joi.string().empty(''),
})

module.exports = jobSchema
