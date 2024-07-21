import React, { useState } from 'react'
import PropTypes, { object } from 'prop-types'

const Selector = ({ options, size = 'lg', setValue, value }) => {
  const sizeMode = () => {
    if (size === 'lg') return 'w-[450px] h-[60px]'
    else if (size === 'md') return 'w-[225px] h-[60px]'
    else return 'w-[150px] h-[40px]'
  }

  return (
    <select
      className={`rounded-lg cursor-pointer border-2 border-gray ${sizeMode()}`}
      onChange={e => setValue(e.target.value)}
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
  )
}

Selector.propTypes = {
  options: PropTypes.arrayOf(object),
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
}

export default Selector
