import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const AuthService = {
  loginWithGoogle: async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      const credential = await firebase.auth().signInWithPopup(provider)
      return {
        userCred: await credential?.user._delegate,
      }
    } catch (error) {
      return {
        error: error.message,
      }
    }
  },
  createUserWithEmailAndPassword: async (email, password) => {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user._delegate
        return {
          userCred: user,
        }
      })
      .catch(error => {
        const errorMessage = error.message

        return {
          error: errorMessage,
        }
      })
  },
  loginWithEmailAndPassword: async (email, password) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      return {
        userCred: user,
      }
    } catch (error) {
      return {
        error: error.message,
      }
    }
  },
  logout: async () => {
    await firebase.auth().signOut()
  },
  forgotPassword: async email => {
    return await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return {
          message: 'Please check your email to reset password',
        }
      })
      .catch(error => {
        return {
          message: error.message,
        }
      })
  },
}
