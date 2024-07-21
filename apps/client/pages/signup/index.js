import React from 'react'
import { SignUpPage } from 'ui'
import { withPublic } from '../../helper/hooks/route'

const index = () => {
  return <SignUpPage />
}

export default withPublic(index)
