import PropTypes from 'prop-types'

import Typography from './../../atoms/typography/Typography'
import Button from './../../atoms/button/Button'
import Icon from './../../atoms/icon/Icon'
import { useState } from 'react'
import Image from 'next/image'
export const ScholarshipContentCard1 = ({ onClick, data }) => {
  const { id, attributes } = data

  const date = new Date(attributes.deadline)

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const formattedDate = date.toLocaleDateString('en-US', options)

  return (
    // containers
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        class="w-full h-48 object-cover object-center"
        src="https://source.unsplash.com/random/800x600"
        alt="Scholarship Image"
      />
      <div class="p-4 md:p-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          {attributes?.scholarship_name}
        </h3>
        <p class="text-base text-gray-700 mb-4">{attributes?.description}</p>
        <div class="flex flex-col md:flex-row md:justify-between">
          <div class="flex-1 mr-4">
            <p class="text-sm font-medium text-gray-600 mb-1">Major Offers</p>
            <p class="text-base text-gray-700">{attributes?.majors}</p>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">
              {attributes?.prize?.type === 'dollars' ? 'Salary' : 'Percent'}{' '}
              Provided
            </p>
            <p class="text-base text-rose-500">
              {attributes?.prize?.amount}{' '}
              {attributes?.prize?.type === 'dollars' ? '$' : '%'}
            </p>
          </div>
          <div class="flex-1 md:flex-none md:w-1/3 mt-4 md:mt-0">
            <p class="text-sm font-medium text-gray-600 mb-1">Deadline</p>
            <p class="text-base text-rose-500"> {formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

ScholarshipContentCard1.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number,
  awardAmount: PropTypes.number,
  deadline: PropTypes.string,
  university: PropTypes.string,
  content: PropTypes.string,
  location: PropTypes.string,
  college: PropTypes.string,
  major: PropTypes.string,
}
