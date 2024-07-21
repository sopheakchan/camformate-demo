export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
// export const BASE_URL = 'http://localhost:80/api/v1'

export async function fetchApi(url, method = 'GET', data = {}, token = '') {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // 'authorization': token && `Bear ${token}`,
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

export async function uploadImage(url, method = 'GET', data = {}, token = '') {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: method,
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: data,
  })
  return await response.json()
}

export async function uploadJob(url, data = {}, file, token = '') {
  let formData = new FormData()
  formData.append('image', file)
  formData.append('company', data.name)
  formData.append('job_name', data.jobTitle)
  formData.append('job_category', data.jobCategory)
  formData.append('location', data.address)

  const salary = data.endSalary
    ? `$${data.startSalary} - $${data.endSalary}`
    : `${
        data.startSalary === 'Negotiable'
          ? data.startSalary
          : `$${data.startSalary}`
      }`

  formData.append('salary', salary)
  formData.append('work_type', data.jobType)
  formData.append('schedule', data.jobSchedule)
  formData.append('deadline', data.deadline)
  formData.append('slots', data.slot)
  const requirements = data.require.map(res => {
    return {
      requirement: res.requirement,
    }
  })
  const benefits = data.benefit.map(res => {
    return {
      benefit: res.benefit,
    }
  })
  const contacts = data.phone.map(res => {
    return {
      contact: res.value,
    }
  })

  formData.append('requirements', JSON.stringify(requirements))
  formData.append('benefits', JSON.stringify(benefits))
  formData.append('user_contacts', JSON.stringify(contacts))
  formData.append('gmail', data.email)
  formData.append('website', data.web)
  formData.append('description', data.des)

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return await response.json()
}

export async function uploadScholarship(url, data = {}, file, token = '') {
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  formData.append('image', file)

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return await response.json()
}

export async function updateJob(url, data, file, token) {
  let formData = new FormData()

  file !== null
    ? formData.append('image', file)
    : formData.append('imageUrl', data.imageUrl)
  formData.append('company', data.company)
  formData.append('job_name', data.job_name)
  formData.append('job_category', data.job_category)
  formData.append('location', data.location)

  const salary = data.endSalary
    ? `$${data.startSalary} - $${data.endSalary}`
    : `${
        data.startSalary === 'Negotiable'
          ? data.startSalary
          : `$${data.startSalary}`
      }`

  formData.append('salary', salary)
  formData.append('work_type', data.work_type)
  formData.append('schedule', data.schedule)
  formData.append('deadline', data.deadline)
  formData.append('slots', data.slots)
  const requirements = data.requirements.map(res => {
    return {
      requirement: res.requirement,
    }
  })
  const benefits = data.benefits.map(res => {
    return {
      benefit: res.benefit,
    }
  })
  const contacts = data.user_contacts.map(res => {
    return {
      contact: res.contact,
    }
  })

  formData.append('requirements', JSON.stringify(requirements))
  formData.append('benefits', JSON.stringify(benefits))
  formData.append('user_contacts', JSON.stringify(contacts))
  formData.append('gmail', data.email)
  formData.append('website', data.website)
  formData.append('description', data.description)

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return await response.json()
}

// update scholarships
export async function updateScholarship(url, data, file, token) {
  let formData = new FormData()

  file !== null
    ? formData.append('image', file)
    : formData.append('image_url', data.image_url)
  formData.append('scholarship_name', data.scholarship_name)
  formData.append('school_name', data.school_name)
  formData.append('majors', data.majors)
  formData.append('location', data.location)
  formData.append('faculty', data.faculty)

  formData.append('price', JSON.stringify(data.price))
  formData.append('deadline', data.deadline)
  formData.append('slot', data.slot)

  const requirements = data.requirements.map(res => {
    return {
      requirement: res.requirement,
    }
  })
  const benefits = data.benefits.map(res => {
    return {
      benefit: res.benefit,
    }
  })

  formData.append('requirements', JSON.stringify(requirements))
  formData.append('benefits', JSON.stringify(benefits))
  formData.append('phone_number', JSON.stringify(data.phone_number))
  formData.append('email', data.email)
  formData.append('description', data.description)

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return await response.json()
}
