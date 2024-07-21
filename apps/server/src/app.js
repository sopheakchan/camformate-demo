const express = require('express')
const cors = require('cors')

const globalError = require('./lib/utils/globalError')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { upload } = require('./lib/middlewares/multerStorage')
const cloudinaryUpload = require('./lib/middlewares/cloudinaryUpload')
// import routes
const SCHOLARSHIP_ROUTES = require('./lib/routes/scholarships.routes')
const INFORMATION_ROUTES = require('./lib/routes/informations.routes')
const USER_ROUTES = require('./lib/routes/users.routes')
const AUTH_ROUTES = require('./lib/routes/auth.routes')
const JOB_ROUTES = require('./lib/routes/jobs.routes')
const APPLICATION_ROUTES = require('./lib/routes/application.routes')

// testing routes
app.get('/api/v1/message', (req, res) => {
  res.json('Hello from server')
})

// upload to cloud
app.post('/upload', upload, cloudinaryUpload, (req, res) => {
  res.send(req.imageUrl)
})

// routes
app.use('/api/v1/scholarships', SCHOLARSHIP_ROUTES)
app.use('/api/v1/users', USER_ROUTES)
app.use('/api/v1', AUTH_ROUTES)
app.use('/api/v1/informations', INFORMATION_ROUTES)
app.use('/api/v1/jobs', JOB_ROUTES)
app.use('/api/v1/applications', APPLICATION_ROUTES)

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'Fail',
    message: err.message,
  })
})

// global error middleware
// app.use(globalError)

module.exports = app
