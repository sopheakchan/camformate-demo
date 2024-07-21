import React from 'react'
import { EditPage } from 'ui'

const EditJob = ({ data }) => {
  return <EditPage data={data} />
}

export async function getServerSideProps(context) {
  const { job_id } = context.query

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${job_id}`,
  )
  const data = await response.json()

  return {
    props: {
      data: data,
    },
  }
}

export default EditJob
