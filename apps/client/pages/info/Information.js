import React from 'react'
import { useQuery } from 'react-query'
import { InfoDetailPage } from 'ui'
import { BASE_URL } from '../../helper/services/FetchAPI'

function Information({ school_id }) {
  const fetchInformations = async () => {
    const response = await fetch(`${BASE_URL}/informations/${school_id}`)
    return response.json()
  }

  const { data, isLoading, error, isError, isSuccess } = useQuery(
    `school_id-[${school_id}]`,
    fetchInformations,
  )

  // console.log(data)

  return (
    <div>
      <InfoDetailPage data={data} />
    </div>
  )
}

export default Information
