import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaHeartBroken } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { Button } from '../../../atoms'
import { ScholarshipSkeleton } from '../../../organisms'
import useAuth from '../../../../../../apps/client/helper/hooks/auth'
import { BASE_URL } from '../../../../../../apps/client/helper/services/FetchAPI'
import axios from 'axios'
import ScholarshipFavoriteCard from './ScholarshipFavCard'

const ScholarshipFav = () => {
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { uid, token } = useAuth()

  // fetch favorite
  const fetchScholarshipsFavorite = async () => {
    setLoading(true)
    const response = await axios.get(`${BASE_URL}/users/${uid}/favorites`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: { type: 'scholarships' },
    })

    if (response.data.status === 'Success') {
      const data = await response.data.favorites.filter(
        fav => fav.type === 'scholarships',
      )
      setScholarships(data)
    }
    setLoading(false)
  }

  const SkeletonComponent = () => {
    return (
      <div className="flex flex-col gap-7 items-center justify-center tablet:grid  tablet:grid-cols-2 tablet:gap-3 desktop:grid desktop:grid-cols-2 mt-8">
        <ScholarshipSkeleton />
        <ScholarshipSkeleton />
        <ScholarshipSkeleton />
        <ScholarshipSkeleton />
        <ScholarshipSkeleton />
        <ScholarshipSkeleton />
      </div>
    )
  }

  useEffect(() => {
    fetchScholarshipsFavorite()
  }, [])

  if (scholarships.length === 0 && !loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-8">
        <FaHeartBroken className="text-danger text-xl" />
        <span className="text-md text-gray-500 opacity-70">No Favorites</span>
        <Button
          icon={<BsSearch />}
          iconAppearance="text-primary"
          className="rounded-lg bg-opacity-20 text-primary active:scale-110"
          onClick={() => router.push('/scholarships')}
        >
          Browse Scholarships
        </Button>
      </div>
    )
  }
  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div className=" flex flex-col gap-7 items-center justify-center tablet:grid  tablet:grid-cols-2 tablet:gap-3 desktop:grid desktop:grid-cols-2 mt-8">
          {scholarships?.map((item, index) => {
            return <ScholarshipFavoriteCard data={item.id} />
          })}
        </div>
      )}
    </div>
  )
}

export default ScholarshipFav
