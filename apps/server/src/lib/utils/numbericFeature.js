const numbericFeatures = numericFeatured => {
  const queryObject = {}

  const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte',
  }

  const regEx = /\b(<|>|>=|=|<=)\b/g

  let filters = numericFeatured.replace(
    regEx,
    match => `-${operatorMap[match]}-`,
  )

  const options = ['prize']

  filters = filters.split(',').forEach(item => {
    const [field, operator, value] = item.split('-')
    if (options.includes(field)) {
      queryObject[`prize.amount`] = { [operator]: Number(value) }
    }
  })

  return queryObject
}

module.exports = numbericFeatures
// console.log(numbericFeatures('price<=12,rating=4.5'))
