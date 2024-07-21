import React, { useState, useEffect } from 'react'
import { ProfileV2 } from 'ui'
import { withProtected } from '../../helper/hooks/route'
import { DataDeserializer } from '../../helper/services/Deserializer'
import { BASE_URL } from '../../helper/services/FetchAPI'
import useAuth from '../../helper/hooks/auth'

const ProfilePage = () => {
  const [data, setData] = useState(null)
  const { uid } = useAuth()

  const fetchUserProfile = () => {
    fetch(`${BASE_URL}/users/${uid}`)
      .then(async res => {
        if (res) {
          return await DataDeserializer(await res.json())
        }
      })
      .then(res => {
        setData(res)
      })
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return <ProfileV2 user={data && data} setUser={setData} />
}

export default withProtected(ProfilePage)
