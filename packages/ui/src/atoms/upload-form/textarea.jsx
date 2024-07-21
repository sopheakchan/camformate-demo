import React from 'react'
import PropTypes from 'prop-types'

const FormTextArea = ({
  placeholder,
  className,
  size = 'requirement',
  onChange,
  value,
  maxLength = 100,
}) => {
  const sizeMode = () => {
    if (size === 'description') {
      return 'w-[800px] h-[350px]'
    } else {
      return 'w-[500px] h-[100px]'
    }
  }
  return (
    <textarea
      maxLength={maxLength}
      placeholder={placeholder}
      className={`p-2 border-2 border-black rounded-lg ${sizeMode()} ${className} resize-none`}
      onChange={onChange}
      value={value}
    />
  )
}

FormTextArea.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['description', 'requirement']),
  onChange: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
}

export default FormTextArea
