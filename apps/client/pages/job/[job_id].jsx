import React, { useState, useEffect } from 'react'
import { JobDetail } from 'ui'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BASE_URL } from '../../helper/services/FetchAPI'
import useAuth from '../../helper/hooks/auth'

const queryClient = new QueryClient()

const DetailJobPage = () => {
  const { uid } = useAuth()

  const router = useRouter()
  const { job_id } = router.query

  const [data, setData] = useState([])
  const [fav, setFav] = useState(false)

  const getJobs = async () => {
    const response = await fetch(`${BASE_URL}/users/${uid}`)
    const users = await response.json()

    return setData(users?.data?.attributes.favorites)
  }

  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    data &&
      data.map(d => {
        if (d.id == job_id) {
          setFav(true)
        }
      })
  }, [data])

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <JobDetail job_id={job_id} favorite={fav} setFavorite={setFav} />
      </div>
    </QueryClientProvider>
  )
}

export default DetailJobPage
