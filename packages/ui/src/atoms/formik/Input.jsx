import React from 'react'
import { Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import { Label } from './label'

const Input = ({ name, label, size, icon, className, ...rest }) => {
  const sizeMode = size => {
    if (size === 'md') {
      return 'p-1.5'
    } else if (size === 'lg') {
      return 'p-2.5'
    }
    return 'p-1'
  }

  return (
    <>
      {label ? <Label htmlFor={name}>{label}</Label> : ''}
      <div
        className={`flex justify-between items-center p-2 text-sm text-gray bg-white border border-gray rounded-md ${sizeMode(
          size,
        )} ${className}`}
      >
        <Field
          name={name}
          id={name}
          {...rest}
          className={
            icon ? `w-10/12 focus:outline-none` : `w-full focus:outline-none`
          }
        />
        {icon ? <label className="w-2/12 flex justify-end">{icon}</label> : ''}
      </div>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['text', 'password', 'email', 'url', 'number', 'tel'])
    .isRequired,
  placeholder: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  size: 'md',
}

export default Input
