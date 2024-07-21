import React from 'react'
import { JobHeroSection, JobBodySection } from 'ui'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <JobHeroSection /> */}
        <JobBodySection />
      </div>
    </QueryClientProvider>
  )
}

export default index
