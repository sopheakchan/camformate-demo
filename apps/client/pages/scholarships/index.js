import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BodySection1 } from 'ui/src/pages'
import { HeroSection } from 'ui/src/pages'

const queryClient = new QueryClient()

const scholarshipPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <HeroSection /> */}
        <BodySection1 />
      </div>
    </QueryClientProvider>
  )
}

export default scholarshipPage
