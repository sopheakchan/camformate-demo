import React from 'react'
import PropTypes from 'prop-types'

const FormInput = ({
  type = 'text',
  border = true,
  placeholder,
  className,
  name,
  value,
  size = 'lg',
  onChange,
}) => {
  const borderStyle = () => {
    if (border) {
      return 'border-2 border-black rounded-lg'
    } else return 'border-b-2 border-gray-500'
  }

  const sizeMode = () => {
    if (size === 'lg') {
      return 'w-[450px] h-[60px]'
    } else if (size === 'md') {
      return 'w-[225px] h-[60px]'
    } else {
      return 'w-[180px] h-[60px] focus:outline-none'
    }
  }

  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      value={value}
      className={`${borderStyle()} ${className} ${sizeMode()} pl-2`}
      onChange={onChange}
    />
  )
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'url', 'number', 'file', 'date']),
  border: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  onChange: PropTypes.func,
}

export default FormInput
