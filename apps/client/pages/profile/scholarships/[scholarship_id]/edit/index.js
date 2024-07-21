import React from 'react'
import { EditPage } from 'ui'

const EditScholarship = ({ data }) => {
  console.log('data: ', data)
  return <EditPage data={data} />
}

export async function getServerSideProps(context) {
  const { scholarship_id } = context.query

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/scholarships/${scholarship_id}`,
  )
  const data = await response.json()

  return {
    props: {
      data: data,
    },
  }
}

export default EditScholarship
