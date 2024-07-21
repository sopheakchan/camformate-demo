import React from 'react'
import PropTypes from 'prop-types'

export const Label = ({ children, className, ...rest }) => {
  return (
    <label
      className={`block mb-2 text-sm text-gray text-start ${className}`}
      {...rest}
    >
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
}
