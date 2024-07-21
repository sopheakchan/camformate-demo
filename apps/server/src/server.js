const app = require('./app')
const mongoose = require('mongoose')
const { DATABASE_URL, PORT } = require('./lib/config')

// connecting to db
mongoose.set('strictQuery', false)
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database . . .')
  })
  .catch(err => console.log(err))

// setup server
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT)
})
