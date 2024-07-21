export const scholarshipInitialValues = data => {
  return {
    scholarship_name: data.scholarship_name,
    description: data.description || '',
    file: null,
    major: data.major,
    school_name: data.school_name,
    faculty: data.faculty,
    location: data.location,
    price: data.price,
    image_url: data.image_url,
    deadline: data?.deadline.split('T')[0],
    requirements: data.requirements,
    benefits: data.benefits,
    slot: data.slot,
    phone_number: data.phone_number,
    email: data.email || '',
    user_id: data.user_id,
    user_profile: data.user_profile,
  }
}
