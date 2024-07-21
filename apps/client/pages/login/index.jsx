import React from 'react'
import { Login } from 'ui'
import { withPublic } from '../../helper/hooks/route'

const index = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default withPublic(index)
