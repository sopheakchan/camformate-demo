import React from 'react'
import { MdOutlineDescription } from 'react-icons/md'
import { TextField } from '../components/TextField'

const PageSix = ({ values }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 mb-4 items-center">
        <span className="p-2 rounded-full bg-gray-500 bg-opacity-30">
          <MdOutlineDescription className="text-xl text-black" />
        </span>
        <span className="text-lg font-bold text-primary">Description</span>
      </div>
      <TextField
        name="description"
        type="text"
        label="Description"
        placeholder="Type in your description here"
      />
    </div>
  )
}

export default PageSix
