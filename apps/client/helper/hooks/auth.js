import { createContext, useState, useContext } from 'react'
import { AuthService } from '../services/AuthService'
import { BASE_URL, fetchApi } from '../services/FetchAPI'

const authContext = createContext()

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const [uid, setUid] = useState('')

  const loginWithGoogle = async () => {
    const { userCred, error } = await AuthService.loginWithGoogle()

    if (!error && userCred) {
      const data = {
        username: userCred.email.split('@')[0],
        uid: userCred.uid,
        email: userCred.email,
        account_type: 'seeker',
      }

      const response = await fetch(`${BASE_URL}/users/${userCred?.uid}`)
      const result = await response.json()
      if (result.status === 'Fail') {
        await fetchApi('/users', 'POST', data)
          .then(res => {
            if (res) {
              setUser(userCred ?? null)
              setError(error ?? '')
              // setUid(userCred?.uid ?? '')
              // setToken(userCred?.accessToken ?? '')
            }
          })
          .catch(err => console.log(err))
      }
    }
  }

  const signupWithGoogle = async () => {
    const { userCred, error } = await AuthService.loginWithGoogle()

    if (!error && userCred) {
      const data = {
        username: userCred.email.split('@')[0],
        uid: userCred.uid,
        email: userCred.email,
      }

      await fetchApi('/users', 'POST', data)
        .then(res => {
          if (res) {
            setUser(userCred ?? null)
            setError(error ?? '')
          }
        })
        .catch(err => console.log(err))
    }
  }

  const loginWithEmailAndPassword = async ({ email, password }) => {
    const { userCred, error } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
    )
    setToken(userCred?.user._delegate.accessToken ?? '')
    setUid(userCred?.uid ?? '')
    setUser(userCred ?? null)
    setError(error ?? '')
  }

  const createUserWithEmailAndPassword = async ({
    username,
    email,
    password,
    // account_type,
  }) => {
    const { userCred, error } =
      await AuthService.createUserWithEmailAndPassword(email, password)

    if (!error) {
      const data = {
        username: username,
        uid: userCred.uid,
        email: email,
      }
      await fetchApi('/users', 'POST', data)
        .then(res => {
          if (res) {
            setUser(userCred ?? null)
          }
        })
        .catch(err => setError(err.message))
    } else setError(error)
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  const forgotPassword = async email => {
    const { message } = await AuthService.forgotPassword(email)
    setMessage(message)
  }

  const value = {
    user,
    error,
    loginWithGoogle,
    signupWithGoogle,
    loginWithEmailAndPassword,
    createUserWithEmailAndPassword,
    logout,
    forgotPassword,
    setUser,
    setError,
    setToken,
    token,
    message,
    setMessage,
    uid,
    setUid,
  }

  return <authContext.Provider value={value} {...props} />
}
