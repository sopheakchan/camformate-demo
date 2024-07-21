exports.parseJobBody = (req, res, next) => {
  const { requirements, benefits, user_contacts } = req.body

  if (requirements) {
    req.body.requirements = JSON.parse(requirements)
  }
  if (benefits) {
    req.body.benefits = JSON.parse(benefits)
  }
  if (user_contacts) {
    req.body.user_contacts = JSON.parse(user_contacts)
  }

  next()
}

exports.parseScholarshipBody = (req, res, next) => {
  const { requirements, benefits, phone_number, price } = req.body

  if (requirements) {
    req.body.requirements = JSON.parse(requirements)
  }
  if (benefits) {
    req.body.benefits = JSON.parse(benefits)
  }
  if (phone_number) {
    req.body.phone_number = JSON.parse(phone_number)
  }
  if (price) {
    req.body.price = JSON.parse(price)
  }

  next()
}
