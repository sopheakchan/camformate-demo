import React from 'react'
import { Field } from '../components/Field'
import { GrMapLocation } from 'react-icons/gr'
import Map from '../components/Map'

const PageTwo = ({ values }) => {
  return (
    <div className="w-full desktop:w-[90%] mx-auto flex flex-col gap-4">
      <div className="flex gap-2 mb-4 items-center">
        <span className="p-2 rounded-full bg-gray-500 bg-opacity-30">
          <GrMapLocation className="text-xl text-black" />
        </span>
        <span className="text-lg font-bold text-primary">Address</span>
      </div>
      <Field
        label="Location"
        name="location"
        type="text"
        placeholder="Address"
      />
      <Map name="location" />
    </div>
  )
}

export default PageTwo
