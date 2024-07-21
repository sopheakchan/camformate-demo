import * as Yup from 'yup'

const jobValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  deadline: Yup.string().required('Deadline is required'),
  slot: Yup.number().required('Number of slots is required'),
  jobCategory: Yup.string().required('Job category is required'),
  jobTitle: Yup.string().required('Job title is required'),
  jobSchedule: Yup.string().required('Job schedule is required'),
  jobType: Yup.string().required('Job type is required'),
  startSalary: Yup.string().required('Starting salary is required'),
  endSalary: Yup.string(),
  file: Yup.mixed().required('File is required'),
  require: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        requirement: Yup.string().required('requirement is required'),
      }),
    )
    .required('Atleast one requirement is required'),
  benefit: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        benefit: Yup.string().required('benefit is required'),
      }),
    )
    .required('Atleast one benefit is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('email is required'),
  web: Yup.string().url('Invalid URL'),
  phone: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        value: Yup.string()
          .matches(/^[0-9]{9,10}$/, 'Invalid phone number')
          .required('Phone number is required'),
      }),
    )
    .required('Atleast one phone number is required'),
  des: Yup.string(),
})

const scholarshipValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  deadline: Yup.string().required('Deadline is required'),
  slot: Yup.number().required('Number of slots is required'),
  file: Yup.mixed().required('File is required'),
  require: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        requirement: Yup.string().required('requirement is required'),
      }),
    )
    .required('Atleast one requirement is required'),
  benefit: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        benefit: Yup.string().required('benefit is required'),
      }),
    )
    .required('Atleast one benefit is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('email is required'),
  web: Yup.string().url('Invalid URL'),
  phone: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        value: Yup.string()
          .matches(/^[0-9]{9,10}$/, 'Invalid phone number')
          .required('Phone number is required'),
      }),
    )
    .required('Atleast one phone number is required'),
  des: Yup.string(),
  rewardType: Yup.string().required('Reward type is required'),
  rewardAmount: Yup.number()
    .min(0, 'Reward amount cannot be negative')
    .required('Reward amount is required'),
  schoolName: Yup.string().required('School name is required'),
})

export { jobValidationSchema, scholarshipValidationSchema }
