const admin = require('firebase-admin')

const config = require('../config')

// admin.initializeApp({
//   credential: admin.credential.cert(config.FIREBASE_CREDENTIAL),
// })

admin.initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGE_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMENT_ID,
})

module.exports = admin
