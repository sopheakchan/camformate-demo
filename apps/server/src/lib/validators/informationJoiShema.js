const Joi = require('joi');

const infoSchema = Joi.object({
  school_name: Joi.string().required().messages({
    'any.required': 'School Name is required',
  }),
  description: Joi.string().required(),
  image: Joi.string().required(),
  rating: Joi.number(),
  location: Joi.string(),
  website: Joi.string(),
  major_description: Joi.string().required(),
  faculties: Joi.array().items(
    Joi.object({
      faculty_name: Joi.string().required().messages({
        'any.required': 'Faculty Name is required',
      }),
      subjects: Joi.array().items(
        Joi.object({
          subject_name: Joi.string().required(),
          prices: Joi.array().items(
            Joi.object({
              year: Joi.string().required(),
              price: Joi.number().required(),
            })
          ),
          image: Joi.array().items(Joi.string()),
        })
      ),
    })
  ),
});

module.exports = infoSchema;