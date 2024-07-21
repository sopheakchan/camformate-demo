import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import useAuth from '../hooks/auth'
import { Loading } from '../../../../packages/ui/src/atoms'

const AuthStateChanged = ({ children }) => {
  const { setUser, setToken, token, setUid, uid } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setToken(user?._delegate.accessToken)
      setUid(user?._delegate.uid)
      setLoading(false)
    })
  }, [uid])

  if (loading) {
    return <Loading />
  }
  return children
}

export default AuthStateChanged
