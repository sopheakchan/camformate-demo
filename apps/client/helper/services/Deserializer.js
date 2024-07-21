const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer

export const DataDeserializer = data => {
  return new JSONAPIDeserializer({
    keyForAttribute: 'underscore_case',
  })
    .deserialize(data, async (err, response) => {
      if (err) throw err
      return await response
    })
    .then(res => res)
    .catch(err => console.log(err))
}
