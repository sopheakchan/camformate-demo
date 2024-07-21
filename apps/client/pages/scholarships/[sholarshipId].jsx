import React from 'react'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import Scholarship from './Scolarship1'

const queryClient = new QueryClient()

const DetailScholarship = () => {
  const router = useRouter()
  const { sholarshipId } = router.query

  return (
    <QueryClientProvider client={queryClient}>
      <Scholarship scholarshipId={sholarshipId} />
    </QueryClientProvider>
  )
}

export default DetailScholarship
