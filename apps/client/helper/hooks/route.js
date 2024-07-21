import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './auth'
import { Loading } from '../../../../packages/ui/src/atoms'

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth()
    const router = useRouter()

    if (auth.user) {
      router.push('/')
      return <Loading />
    }

    return <Component auth={auth} {...props} />
  }
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()

    if (!auth.user) {
      router.push('/login')
      return <Loading />
    }

    return <Component auth={auth} {...props} />
  }
}
