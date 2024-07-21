import React from 'react'
import { InfoBody, InfoHero } from 'ui'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const Information = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <InfoHero /> */}
      <InfoBody />
    </QueryClientProvider>
  )
}

export default Information
