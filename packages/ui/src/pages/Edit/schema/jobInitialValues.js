import * as Yup from 'yup'

export const jobValidationSchema = Yup.object().shape({
  company: Yup.string().required('Company name is required'),
  imageUrl: Yup.string(),
  job_name: Yup.string().required('Job name is required'),
  job_category: Yup.string().required('Job category is required'),
  salary: Yup.string().required('Salary is required'),
  deadline: Yup.date().required('Deadline is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string(),
  slots: Yup.number().required('Number of available slots is required'),
  schedule: Yup.string().required('Schedule is required'),
  work_type: Yup.string().required('Work type is required'),
  requirements: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      requirement: Yup.string().required('Requirement is required'),
    }),
  ),
  benefits: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      benefit: Yup.string().required('Benefit is required'),
    }),
  ),
  user_contacts: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      contact: Yup.string()
        .matches(/^\d+$/, 'Please enter a valid phone number')
        .required('Phone number is required'),
    }),
  ),
  gmail: Yup.string().email('Please enter a valid email'),
  website: Yup.string().url('Please enter a valid URL'),
  user_id: Yup.string().required(),
  user_profile: Yup.string().required(),
})

export const jobInitialValues = data => {
  let salaryStr = data?.salary

  let salary = {
    start: null,
    end: null,
  }

  if (salaryStr === 'Negotiable') {
    salary.start = 'Negotiable'
  } else if (salaryStr.split('-').length > 1) {
    salary.start = salaryStr.split('-')[0].split('$')[1] * 1
    salary.end = salaryStr.split('-')[1].split('$')[1] * 1

    salaryStr = '$XXX - $XXX'
  } else if (typeof (salaryStr.split('$')[1] * 1) === 'number') {
    salary.start = salaryStr.split('$')[1] * 1
    salaryStr = '$XXX'
  }

  return {
    company: data.company,
    imageUrl: data.imageUrl,
    file: null,
    job_name: data.job_name,
    job_category: data.job_category,
    school_name: data.school_name,
    salary: data.salary,
    deadline: data?.deadline.split('T')[0],
    location: data.location,
    description: data.description || '',
    slots: data.slots,
    schedule: data.schedule,
    work_type: data.work_type,
    salary_type: salaryStr || 'Negotiable',
    startSalary: salary.start === null ? 'Negotiable' : salary.start,
    endSalary: salary.end,
    requirements: data.requirements,
    benefits: data.benefits,
    user_contacts: data.user_contacts,
    gmail: data.gmail || '',
    website: data.website || '',
    user_id: data.user_id,
    user_profile: data.user_profile,
  }
}
