import React from 'react'
import { useRouter } from 'next/router'
import { QueryClient,QueryClientProvider } from 'react-query'
import Information from './Information'

const queryClient = new QueryClient()
const DetailInformationPage = () => {
  const router = useRouter()
  const {school_id}  = router.query
  // console.log(school_id)
  return(
    <QueryClientProvider client={queryClient}>
     <Information school_id={school_id}/>
    </QueryClientProvider>
  )
}

export default DetailInformationPage
