import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  if (typeof window !== 'undefined') {
    if ('measurementId' in firebaseConfig) {
      firebase.analytics()
    }
  }
}
