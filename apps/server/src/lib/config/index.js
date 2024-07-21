const path = require('path')
const dotenv = require('dotenv')

require('dotenv').config({ path: '.env.local' })
const cloudinary = require('./cloudinary')

module.exports = {
  DATABASE_URL: process.env.DATABASE,
  PORT: process.env.PORT || 4000,
  // FIREBASE_CREDENTIAL: JSON.parse(process.env.FIREBASE_CREDENTIAL),
  CLOUDINARY: cloudinary,
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDERID: process.env.MESSAGING_SENDERID,
  APP_ID: process.env.APP_ID,
  MEASUREMENT_ID: process.env.MEASUREMENT_ID,
}
