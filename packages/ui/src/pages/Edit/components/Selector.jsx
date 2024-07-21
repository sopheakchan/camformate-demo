import React, { useState } from 'react'
import PropTypes, { object } from 'prop-types'
import { useField } from 'formik'

export const Selector = ({ options, size = 'lg', value, name, label }) => {
  const [_, meta, helpers] = useField(name)
  const sizeMode = () => {
    if (size === 'lg')
      return 'w-full tablet:w-[300px] desktop:w-[450px] h-[60px]'
    else if (size === 'md') return 'w-[225px] h-[60px]'
    else return 'w-[150px] h-[40px]'
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      <select
        className={`rounded-2xl cursor-pointer border-[1px] bg-white border-gray-200 px-3 focus:ring focus:ring-primary focus:ring-opacity-40 focus:outline-none ${sizeMode()}`}
        onChange={e => helpers.setValue(e.target.value)}
        defaultValue={value}
      >
        {options.map((option, index) => {
          return (
            <option value={option.label} className="cursor-pointer" key={index}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

Selector.propTypes = {
  options: PropTypes.arrayOf(object),
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
}
