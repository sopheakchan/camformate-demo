import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { DetailPageBodySection1 } from 'ui'
import { BASE_URL } from '../../helper/services/FetchAPI'
import useAuth from '../../helper/hooks/auth'

function Scholarship({ scholarshipId }) {
  const { uid } = useAuth()

  const fetchScholarships = async () => {
    const response = await fetch(`${BASE_URL}/scholarships/${scholarshipId}`)
    return await response.json()
  }

  const { data, isLoading, error, isError } = useQuery(
    `scholarship-[${scholarshipId}]`,
    fetchScholarships,
  )

  const [scholarshipFav, setScholarshipFav] = useState([])
  const [fav, setFav] = useState(false)

  const getJobs = async () => {
    const response = await fetch(`${BASE_URL}/users/${uid}`)
    const users = await response.json()

    return setScholarshipFav(users?.data?.attributes.favorites)
  }

  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    scholarshipFav &&
      scholarshipFav.map(d => {
        if (d.id == scholarshipId) {
          setFav(true)
        }
      })
  }, [scholarshipFav])

  return (
    <div>
      <DetailPageBodySection1
        info={data?.data}
        favorite={fav}
        setFavorite={setFav}
      />
    </div>
  )
}

export default Scholarship
