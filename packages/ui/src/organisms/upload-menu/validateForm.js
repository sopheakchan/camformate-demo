export const jobValidator = data => {
  const {
    name,
    address,
    deadline,
    slot,
    jobCategory,
    jobTitle,
    jobSchedule,
    jobType,
    file,
    require,
    benefit,
    phone,
  } = data

  if (
    name &&
    address &&
    deadline &&
    slot &&
    jobCategory &&
    jobTitle &&
    jobSchedule &&
    jobType &&
    file &&
    require.length > 0 &&
    benefit.length > 0 &&
    phone.length > 0
  ) {
    return true
  }
  return false
}
